function isObject(data){
    return data && typeof data === 'object';
}
let targetMap = new WeakMap();
let activeEffect;
function track(target,key){
    let depsMap = targetMap.get(target);
    if(!depsMap)targetMap.set(target,(depsMap = new Map()));
    let dep = depsMap.get(key);
    if(!dep)depsMap.set(key,(dep = new Set()));
    if(!dep.has(activeEffect))dep.add(activeEffect);
}
function trigger(target,key){
    let depsMap = targetMap.get(target);
    if(!depsMap)return;
    depsMap.get(key).forEach(e => e && e());
}
function effect(fn,options = {}){
    const __effect = function(...args){
        activeEffect = __effect;
        return fn(...args);
    }
    if(!options.lazy){
        __effect();
    }
    return __effect;
}
/**
 * 对象 { count:0 }
 * @param {*} data 
 * @returns 
 */
function reactive(data){
    if(!isObject(data))return;
    return new Proxy(data,{
        get(target,key,receiver){
            const ret = Reflect.get(target,key,receiver);
            track(target,key);
            return isObject(ret) ? reactive(ret) : ret;
        },
        set(target,key,val,receiver){
            Reflect.set(target,key,val,receiver);
            trigger(target,key);
            return true;
        },
        deleteProperty(){
            const ret = Reflect.deleteProperty(target,key,receiver);
            trigger(target,key);
            return ret;
        }
    })
}
/**
 * 基本类型
 * const count = ref(0);
 * count.value++
 */
function ref(target){
    let value = target;
    const obj = {
        get value(){
            track(obj,'value');
            return value
        },
        set value(newValue){
            if(value === newValue)return;
            value = newValue;
            trigger(obj,'value');
        }
    }
    return obj;
}
function computed(fn){
    // 只考虑函数的情况
    // 延迟计算 const c = computed(() => `${ count.value}!`)
    let __computed;
    const run = effect(fn,{ lazy:true });
    __computed = {
        get value(){
            return run();
        }
    }
    return __computed;
}
function mount(instance,el){
    effect(function(){
        instance.$data && update(instance,el);
    });
    instance.$data = instance.setup();
    update(instance,el)
}
// compile编译的实现很水
function update(instance,el){
    el.innerHTML = instance.render();
}