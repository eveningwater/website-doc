<template>
    <ul class="ew-tree">
        <li class="ew-tree_branch" v-for="item in model" :key="item.id">
            <div class="ew-tree_click">
                <button type="button" class="ew-tree_children_btn" v-if="item.children" @click="toggle(item)">{{ !item.show
                    ?
                    '-' : '+' }}</button>
                <span class="ew-folder">{{ item.name }}</span>
            </div>
            <ew-tree v-show="!item.show" v-if="item.children" :model="item.children"></ew-tree>
        </li>
    </ul>
</template>
<script>
export default {
    name: "ewTree",
    props: {
        model: {}
    },
    data() {
        return {

        }
    },
    methods: {
        toggle: function (item) {
            var idx = this.model.indexOf(item)
            this.$set(this.model[idx], 'show', !item.show)
        }
    }
}
</script>
<style>
ul,
li {
    list-style: none;
}

.ew-tree_container {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 3px #ccc;
    margin: 13px;
    position: relative;
}

.ew-tree {
    width: calc(100% - 44px);
    height: 100%;
    padding-left: 42px;
}

.ew-tree_branch {
    width: 100%;
    height: 100%;
    display: block;
    padding: 13px;
    position: relative;
}

.ew-tree_branch .ew-tree_children_btn {
    width: 19px;
    height: 19px;
    background-color: #23b1f0;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    outline: none;
    border: 0;
    cursor: pointer;
}

ul.ew-tree:before {
    content: "";
    border-left: 1px dashed #999999;
    height: calc(100%);
    position: absolute;
    left: 10px;
    top: 0px;
}

.ew-tree .ew-tree_branch:last-child::before {
    content: "";
    width: 3px;
    height: calc(100% - 24px);
    display: block;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    left: -34px;
}

.ew-tree,
.ew-tree_branch {
    position: relative;
}

.ew-tree_branch::after {
    content: "";
    width: 40px;
    height: 0;
    border-bottom: 1px dashed #000;
    position: absolute;
    right: calc(100% - 9px);
    top: 22px;
}

.ew-tree_container>.ew-tree::before,
.ew-tree_container>.ew-tree>.ew-tree_branch::after {
    display: none;
}
</style>