class Select {
    constructor(options = {}){

    }
    render(optionsData = []){
        return (
            `
                <div class="ew-select">
                    <div class="ew-select-value"></div>
                    <div class="ew-select-panel">
                        ${
                            optionsData.reduce((res,item) => res += `<div class="ew-select-option" data-value="${item.value}" data-label="${item.label}">${item.label}</div>`,'')
                        }
                    </div>
                </div>
            `
        )
    }
}