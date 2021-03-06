import Event from "./event.js"
import {preventDefault,stopPropagation ,generateUUID} from "./utils.js"

class ToolBar extends Event{
    constructor(parent){
        super()
        this.el = null
        this.parent = parent
        this.copyButton = null
        this.pasteButton = null
        this.clearFormat = null
        this.typeFaceButton = null
        this.fontSizeButton = null
        this.fontWeightButton = null
        this.fontItalicButton = null
        this.underLineButton = null
        this.textFillButton = null
        this.fillButton = null
        this.borderButton = null
        this.alignLiftButton = null
        this.alignRightButton = null
        this.alignCenterButton = null
        this.mergeCellButton = null
        this.splitCellButton = null
        this.addImageButton = null
        this.init(parent)
    }
    init(parent){
        this.el = document.createElement('div')
        this.el.id = 'daodao_excel_scroll_toolbar-wrapper'
        this.el.style.cssText = `
            height:30px;
        `
        const first = parent.firstChild
        parent.insertBefore(this.el,first)
        this.initStyle()
        this.initCopy()
        this.initPaste()
        this.initClearFormat()
        this.initTypeFace()
        this.initFontSize()
        this.initFontWeight()
        this.initFontItalic()
        this.initTextFill()
        this.initFill()
        this.initBorder()
        this.initAlignLeft()
        this.initAlignRight()
        this.initAlignCenter()
        this.initMergeCell()
        this.initSplitCell()
        this.initAddImage()
    }
    initStyle(){
        const style = document.createElement('style')
        style.innerHTML = `
            #daodao_excel_scroll_toolbar-wrapper .toolbar-item{
                display: inline-block;
                position:relative;
                border:1px solid transparent;
                vertical-align: middle;
                cursor: pointer;
                margin-right:4px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-item .tooltip__down{
                display:none;
                position:absolute;
                margin-top:10px;
                left:50%;
                margin-left:-35px;
                width:70px;
                height:22px;
                line-height: 22px;
                font-size:12px;
                border:1px solid #d0d0d0;
                background: #fff;
                text-align: center;
                z-index:10;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-item .tooltip__down:before{
                content:'';
                width:0;
                height:0;
                border-bottom:8px solid #d0d0d0;
                border-right:5px solid transparent;
                border-left:5px solid transparent;
                position:absolute;
                top:-8px;
                left:50%;
                margin-left:-5px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-item .tooltip__down:after{
                content:'';
                width:0;
                height:0;
                border-bottom:8px solid #ffffff;
                border-right:5px solid transparent;
                border-left:5px solid transparent;
                position:absolute;
                top:-6px;
                left:50%;
                margin-left:-5px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-item:hover{
                border:1px solid #d0d0d0;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-item:hover .tooltip__down{
                display: block;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-button{
                width:20px;
                height:20px;
                text-align: center;
                background:#fff;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-button.active{
                background:#e0e0e0
            }
        `
        this.el.appendChild(style)
    }
    initCopy(){
        this.copyButton = this.addButton(
            '<svg t="1587712853665" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1189" width="16" height="16"><path d="M677.6 232.8h-503.2c-61.6 0-112 50.4-112 112v503.2c0 61.6 50.4 112 112 112h503.2c61.6 0 112-50.4 112-112V344.8c-0.8-62.4-50.4-112-112-112z m56 614.4c0 31.2-24.8 56-56 56h-503.2c-31.2 0-56-24.8-56-56v-503.2c0-31.2 24.8-56 56-56h503.2c31.2 0 56 24.8 56 56v503.2z" p-id="1190"></path><path d="M230.4 432h391.2v56h-391.2zM230.4 568h391.2v56h-391.2zM230.4 703.2h223.2v56h-223.2z" p-id="1191"></path><path d="M844.8 64.8h-503.2c-61.6 0-112 50.4-112 112h56c0-31.2 24.8-56 56-56h503.2c31.2 0 56 24.8 56 56v503.2c0 31.2-24.8 56-56 56v56c61.6 0 112-50.4 112-112V176.8c0-62.4-50.4-112-112-112z" p-id="1192"></path></svg>',
            '复制',
             (e)=>{
                this.emit('copy',{
                    data:true
                })
             },
             false   
        )
    }
    initPaste(){
        this.copyButton = this.addButton(
            '<svg t="1587713229749" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1790" width="16" height="16"><path d="M469.12 80.64h128a32 32 0 0 0 32-32 32 32 0 0 0-32-32h-128a32 32 0 0 0-32 32 32 32 0 0 0 32 32zM276.48 174.08a32 32 0 0 0 32-32v-29.44a32 32 0 0 1 31.36-32 32 32 0 0 0 32-32 33.28 33.28 0 0 0-32.64-32 96.64 96.64 0 0 0-94.72 96v29.44a32 32 0 0 0 32 32zM727.68 80.64h128a32 32 0 0 0 32-32 32 32 0 0 0-32-32h-128a32 32 0 0 0-32 32 32 32 0 0 0 32 32zM976 571.52a32 32 0 0 0-32 32v128a32.64 32.64 0 0 0 32 32 32 32 0 0 0 32-32v-128a32 32 0 0 0-32-32zM912 794.88h-128a32.64 32.64 0 0 0-32 32 32 32 0 0 0 32 32h128a31.36 31.36 0 0 0 31.36-32 33.28 33.28 0 0 0-31.36-32zM1000.32 74.24A32 32 0 0 0 960 57.6a32.64 32.64 0 0 0-16.64 42.24 28.8 28.8 0 0 1 0 12.8v103.04a32.64 32.64 0 0 0 32 32 32 32 0 0 0 32-32V112.64a97.92 97.92 0 0 0-7.04-38.4zM976 312.96a32 32 0 0 0-32 32v128a32.64 32.64 0 0 0 32 32 32 32 0 0 0 32-32v-128a32 32 0 0 0-32-32z" fill="#323333" p-id="1791"></path><path d="M683.52 1006.08H112a96 96 0 0 1-96-96V259.84a96 96 0 0 1 96-96h571.52a96 96 0 0 1 96 96v650.24a96 96 0 0 1-96 96zM112 227.84a32 32 0 0 0-32 32v650.24a32 32 0 0 0 32 32h571.52a32 32 0 0 0 32-32V259.84a32 32 0 0 0-32-32z" fill="#323333" p-id="1792"></path><path d="M604.16 423.68H192a32 32 0 0 1-32-32 32 32 0 0 1 32-32h412.16a32 32 0 0 1 32 32 32.64 32.64 0 0 1-32 32zM604.16 616.96H192a32 32 0 0 1 0-64h412.16a32 32 0 0 1 0 64zM604.16 810.24H192a32 32 0 0 1-32-32 32 32 0 0 1 32-32h412.16a32.64 32.64 0 0 1 32 32 32 32 0 0 1-32 32z" fill="#323333" p-id="1793"></path></svg>',
            '粘贴',
             (e)=>{
                this.emit('paste',{
                    data:true
                })
             },
             false   
        )
    }
    initClearFormat(){
        this.copyButton = this.addButton(
            '<svg t="1587714676050" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2007" width="16" height="16"><path d="M970.105263 970.105263H53.894737V485.052632h916.210526v485.052631zM107.789474 916.210526h808.421052v-377.263158H107.789474v377.263158z" fill="#444A5C" p-id="2008"></path><path d="M970.105263 538.947368H53.894737V323.368421h301.810526V53.894737h307.2v269.473684H970.105263v215.578947zM107.789474 485.052632h808.421052V377.263158h-301.810526V107.789474H409.6v269.473684H107.789474v107.789474z" fill="#444A5C" p-id="2009"></path><path d="M700.631579 646.736842v323.368421h53.894737v-323.368421h-53.894737z m-323.368421 269.473684h53.894737v-107.789473H377.263158v107.789473z m-107.789474 53.894737h53.894737v-269.473684H269.473684v269.473684z" fill="#444A5C" p-id="2010"></path></svg>',
            '清除格式',
             (e)=>{
                this.emit('clearFormat',{
                    data:true
                })
             },
             false   
        )
    }
    initTypeFace(){
        const id = generateUUID()
        const html = `
            <select id="${id}">
                <option value="微软雅黑">微软雅黑</option>
                <option value="宋体">宋体</option>
                <option value="Arial">Arial</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Verdana">Verdana</option>
            </select>
            <div class="tooltip__down">
                选择字体
            </div>
        `
        let div = document.createElement('div')
        div.classList = ["toolbar-item"]
        div.innerHTML = html

        const style = document.createElement('style')
        style.innerHTML = `
            #daodao_excel_scroll_toolbar-wrapper select{
                border:none!important;
                outline: none!important;
            }
        `
        this.el.appendChild(style)

        this.el.appendChild(div)

        this.typeFaceButton = document.getElementById(id)
        
        this.typeFaceButton.addEventListener('change',(e) => {
            this.emit('changeTypeFace',{
                data:e.target.value
            })
        })
    }
    initFontSize(){
        const id = generateUUID()
        const html = `
            <select id="${id}">
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="24">24</option>
                <option value="30">30</option>
                <option value="36">36</option>
            </select>
            <div class="tooltip__down">
                字体大小
            </div>
        `
        let div = document.createElement('div')
        div.classList = ["toolbar-item"]
        div.innerHTML = html

        this.el.appendChild(div)

        this.fontSizeButton = document.getElementById(id)
        
        this.fontSizeButton.addEventListener('change',(e) => {
            this.emit('changeFontSize',{
                data:e.target.value
            })
        })
    }
    initFontWeight(){
        this.fontWeightButton = this.addButton(
            '<svg t="1586917665010" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2949" width="16" height="16"><path d="M311.296 460.8h266.24c59.392 0 108.544-49.152 108.544-108.544s-49.152-108.544-108.544-108.544h-266.24V460.8z m-30.72-296.96h296.96c104.448 0 190.464 83.968 190.464 190.464 0 55.296-22.528 104.448-61.44 139.264 55.296 34.816 92.16 98.304 92.16 167.936 0 110.592-90.112 198.656-198.656 198.656h-368.64v-696.32h49.152z m30.72 614.4h286.72c65.536 0 116.736-53.248 116.736-116.736s-53.248-116.736-116.736-116.736h-286.72v233.472z" p-id="2950"></path></svg>',
            '加粗',
             (e)=>{
                 if(e){
                    this.emit('changeFontWeight',{
                        data:'bold'
                    })
                 }else{
                    this.emit('changeFontWeight',{
                        data:'normal'
                    })
                 }
             },
             true   
        )
    }
    initFontItalic(){
        this.fontItalicButton = this.addButton(
            '<svg t="1586917855578" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3832" width="16" height="16"><path d="M517.888 693.376c-3.456 18.688-5.376 32.448-5.76 41.088-0.32 8.64 0.512 15.488 2.496 20.48s5.568 9.216 10.688 12.544 13.824 6.72 26.112 10.048l-3.776 20.48H369.984l3.776-20.48c18.24-4.48 30.848-9.408 37.696-14.912 6.912-5.44 12.16-13.184 15.872-23.296 3.712-10.048 7.424-25.408 11.328-46.08l67.392-362.56c3.584-19.328 5.504-33.28 5.76-42.112 0.192-8.768-0.832-15.616-3.136-20.544-2.304-4.864-5.888-8.768-10.624-11.712-4.8-2.944-13.376-6.208-25.536-9.856l3.776-20.48h177.728l-3.776 20.48c-12.928 3.072-22.464 6.144-28.48 9.216-6.08 3.072-11.136 6.912-15.232 11.52s-7.744 11.52-11.008 20.736c-3.264 9.152-6.72 23.424-10.304 42.688l-67.328 362.752z" fill="" p-id="3833"></path></svg>',
            '倾斜',
             (e)=>{
                 if(e){
                    this.emit('changeFontItalic',{
                        data:'italic'
                    })
                 }else{
                    this.emit('changeFontItalic',{
                        data:'normal'
                    })
                 }
             },
             true   
        )
    }
    initTextFill(){
        const id = generateUUID()
        const id1 = generateUUID()
        const id2 = generateUUID()
        const html = `
            <div class="toolbar-icon" id="${id1}">
                <svg style="margin-top: 0px;vertical-align: top" t="1586918593118" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4607" width="14" height="16"><path d="M792.864 922.112l103.584-2.176L572.576 110.24h-89.184L161.696 919.936H264l66.944-167.936h394.112l67.808 170.112zM369.216 656L528 257.632 686.784 656h-317.568z" p-id="4608"></path></svg>
                <div class="color-line" style="box-sizing:content-box;width:12px;height:2px;background-color:#000;line-height:0px;margin-top:-2px;border:1px solid #aaa"></div>
            </div>
            <div class="tooltip__down">
                文字颜色
            </div>
            <div class="dropdown-icon">
                <svg id="${id2}" style="height:16px;" t="1586922548084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5368" width="8" height="8"><path d="M958.009 307.2c0-9.317-3.554-18.636-10.663-25.746-14.219-14.218-37.273-14.218-51.491 0l-383.854 383.856-383.854-383.856c-14.219-14.218-37.271-14.218-51.49 0-14.219 14.22-14.219 37.271 0 51.491l409.6 409.6c14.219 14.218 37.271 14.218 51.49 0l409.6-409.6c7.109-7.11 10.663-16.429 10.663-25.746z" p-id="5369"></path></svg>
                <div class="dropdown-card" id="${id}">
                    <div class="color-button" data-color="#ffffff" style="background-color:#ffffff"></div>
                    <div class="color-button" data-color="#0d0015" style="background-color:#0d0015"></div>
                    <div class="color-button" data-color="#fe2c23" style="background-color:#fe2c23"></div>
                    <div class="color-button" data-color="#ff9900" style="background-color:#ff9900"></div>
                    <div class="color-button" data-color="#ffd900" style="background-color:#ffd900"></div>
                    <div class="color-button" data-color="#a3e043" style="background-color:#a3e043"></div>
                    <div class="color-button" data-color="#37d9f0" style="background-color:#37d9f0"></div>
                    <div class="color-button" data-color="#4da8ee" style="background-color:#4da8ee"></div>
                    <div class="color-button" data-color="#956FE7" style="background-color:#956FE7"></div>

                    <div class="color-button" data-color="#F3F3F4" style="background-color:#F3F3F4"></div>
                    <div class="color-button" data-color="#CCCCCC" style="background-color:#CCCCCC"></div>
                    <div class="color-button" data-color="#FEF2F0" style="background-color:#FEF2F0"></div>
                    <div class="color-button" data-color="#FEF5E7" style="background-color:#FEF5E7"></div>
                    <div class="color-button" data-color="#FEFCD9" style="background-color:#FEFCD9"></div>
                    <div class="color-button" data-color="#EDF6E8" style="background-color:#EDF6E8"></div>
                    <div class="color-button" data-color="#E6FAFA" style="background-color:#E6FAFA"></div>
                    <div class="color-button" data-color="#EBF4FC" style="background-color:#EBF4FC"></div>
                    <div class="color-button" data-color="#F0EDF6" style="background-color:#F0EDF6"></div>

                    <div class="color-button" data-color="#D7D8D9" style="background-color:#D7D8D9"></div>
                    <div class="color-button" data-color="#A5A5A5" style="background-color:#A5A5A5"></div>
                    <div class="color-button" data-color="#FBD4D0" style="background-color:#FBD4D0"></div>
                    <div class="color-button" data-color="#FFD7B9" style="background-color:#FFD7B9"></div>
                    <div class="color-button" data-color="#F9EDA6" style="background-color:#F9EDA6"></div>
                    <div class="color-button" data-color="#d4e9d6" style="background-color:#d4e9d6"></div>
                    <div class="color-button" data-color="#C7E6EA" style="background-color:#C7E6EA"></div>
                    <div class="color-button" data-color="#CCE0F1" style="background-color:#CCE0F1"></div>
                    <div class="color-button" data-color="#DAD5E9" style="background-color:#DAD5E9"></div>

                    <div class="color-button" data-color="#7B7F83" style="background-color:#7B7F83"></div>
                    <div class="color-button" data-color="#494949" style="background-color:#494949"></div>
                    <div class="color-button" data-color="#EE7976" style="background-color:#EE7976"></div>
                    <div class="color-button" data-color="#FAA573" style="background-color:#FAA573"></div>
                    <div class="color-button" data-color="#e6b322" style="background-color:#e6b322"></div>
                    <div class="color-button" data-color="#98C091" style="background-color:#98C091"></div>
                    <div class="color-button" data-color="#79C6CD" style="background-color:#79C6CD"></div>
                    <div class="color-button" data-color="#6EAAD7" style="background-color:#6EAAD7"></div>
                    <div class="color-button" data-color="#9C8EC1" style="background-color:#9C8EC1"></div>

                    <div class="color-button" data-color="#41464B" style="background-color:#41464B"></div>
                    <div class="color-button" data-color="#333333" style="background-color:#333333"></div>
                    <div class="color-button" data-color="#BE1A1D" style="background-color:#BE1A1D"></div>
                    <div class="color-button" data-color="#B95514" style="background-color:#B95514"></div>
                    <div class="color-button" data-color="#AD720E" style="background-color:#AD720E"></div>
                    <div class="color-button" data-color="#1C7231" style="background-color:#1C7231"></div>
                    <div class="color-button" data-color="#1C7892" style="background-color:#1C7892"></div>
                    <div class="color-button" data-color="#19439C" style="background-color:#19439C"></div>
                    <div class="color-button" data-color="#511B78" style="background-color:#511B78"></div>
                </div>
            </div>
        `
        let div = document.createElement('div')
        div.classList.add("toolbar-item","toolbar-drop-down","toolbar-color")
        div.innerHTML = html

        const style = document.createElement('style')
        style.innerHTML = `
            #daodao_excel_scroll_toolbar-wrapper .dropdown-icon{
                height:20px;
                display: inline-block;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-icon{
                height:20px;
                display: inline-block;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-color .dropdown-icon .dropdown-card{
                display: none;
                position:absolute;
                left:50%;
                margin-left:-110px;
                width:220px;
                line-height: 22px;
                font-size:12px;
                border:1px solid #d0d0d0;
                background: #fff;
                text-align: center;
                z-index:10;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-color .dropdown-icon .dropdown-card:before{
                content:'';
                width:0;
                height:0;
                border-bottom:8px solid #d0d0d0;
                border-right:5px solid transparent;
                border-left:5px solid transparent;
                position:absolute;
                top:-8px;
                left:50%;
                margin-left:-5px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-color .dropdown-icon .dropdown-card:after{
                content:'';
                width:0;
                height:0;
                border-bottom:8px solid #ffffff;
                border-right:5px solid transparent;
                border-left:5px solid transparent;
                position:absolute;
                top:-6px;
                left:50%;
                margin-left:-5px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-color .dropdown-card .color-button{
                width:20px;
                height:20px;
                float:left;
                margin:4px 2px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-color .dropdown-card .color-button:hover{
                box-shadow:0 0 7px 2px #d0d0d0;
            }
    
        `
        this.el.appendChild(style)

        this.el.appendChild(div)

        this.textFillButton = document.getElementById(id1)

        document.getElementById(id2).addEventListener('click',(event) => {
            stopPropagation(event)
            document.getElementById(id).style.display = 'block'
            parent.addEventListener('click',hide)
        })
        
        document.getElementById(id).addEventListener('click',(e) => {
            let color = e.target.dataset.color
            document.getElementById(id).style.display = 'none'
            this.emit('changeTextFill',{
                data:color
            })
            this.textFillButton.querySelector(".color-line").style.backgroundColor = color
        })

        function hide(){
            document.getElementById(id).style.display = 'none'
            parent.removeEventListener('click',hide)
        }
    }
    initFill(){
        const id = generateUUID()
        const id1 = generateUUID()
        const id2 = generateUUID()
        const html = `
            <div class="toolbar-icon" id="${id1}">
                <svg t="1586930965024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5660" width="16" height="16"><path d="M896 384c-46.72-46.72-160.64-25.6-219.52-10.24L448.64 152.96l-21.76 21.76L313.6 65.28 223.36 152.96 336.64 262.4 66.56 524.16v2.56L448.64 896l359.68-349.44L960 693.12S960 448 896 384zM194.56 524.16l255.36-247.68 254.72 247.68H194.56z" p-id="5661"></path></svg>
                <div class="color-line" style="box-sizing:content-box;width:12px;height:2px;background-color:#000;line-height:0px;margin-top:-4px;border:1px solid #aaa;"></div>
            </div>
            <div class="tooltip__down">
                背景颜色
            </div>
            <div class="dropdown-icon">
                <svg id="${id2}" style="height:16px;" t="1586922548084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5368" width="8" height="8"><path d="M958.009 307.2c0-9.317-3.554-18.636-10.663-25.746-14.219-14.218-37.273-14.218-51.491 0l-383.854 383.856-383.854-383.856c-14.219-14.218-37.271-14.218-51.49 0-14.219 14.22-14.219 37.271 0 51.491l409.6 409.6c14.219 14.218 37.271 14.218 51.49 0l409.6-409.6c7.109-7.11 10.663-16.429 10.663-25.746z" p-id="5369"></path></svg>
                <div class="dropdown-card" id="${id}">
                    <div class="color-button" data-color="#ffffff" style="background-color:#ffffff"></div>
                    <div class="color-button" data-color="#0d0015" style="background-color:#0d0015"></div>
                    <div class="color-button" data-color="#fe2c23" style="background-color:#fe2c23"></div>
                    <div class="color-button" data-color="#ff9900" style="background-color:#ff9900"></div>
                    <div class="color-button" data-color="#ffd900" style="background-color:#ffd900"></div>
                    <div class="color-button" data-color="#a3e043" style="background-color:#a3e043"></div>
                    <div class="color-button" data-color="#37d9f0" style="background-color:#37d9f0"></div>
                    <div class="color-button" data-color="#4da8ee" style="background-color:#4da8ee"></div>
                    <div class="color-button" data-color="#956FE7" style="background-color:#956FE7"></div>

                    <div class="color-button" data-color="#F3F3F4" style="background-color:#F3F3F4"></div>
                    <div class="color-button" data-color="#CCCCCC" style="background-color:#CCCCCC"></div>
                    <div class="color-button" data-color="#FEF2F0" style="background-color:#FEF2F0"></div>
                    <div class="color-button" data-color="#FEF5E7" style="background-color:#FEF5E7"></div>
                    <div class="color-button" data-color="#FEFCD9" style="background-color:#FEFCD9"></div>
                    <div class="color-button" data-color="#EDF6E8" style="background-color:#EDF6E8"></div>
                    <div class="color-button" data-color="#E6FAFA" style="background-color:#E6FAFA"></div>
                    <div class="color-button" data-color="#EBF4FC" style="background-color:#EBF4FC"></div>
                    <div class="color-button" data-color="#F0EDF6" style="background-color:#F0EDF6"></div>

                    <div class="color-button" data-color="#D7D8D9" style="background-color:#D7D8D9"></div>
                    <div class="color-button" data-color="#A5A5A5" style="background-color:#A5A5A5"></div>
                    <div class="color-button" data-color="#FBD4D0" style="background-color:#FBD4D0"></div>
                    <div class="color-button" data-color="#FFD7B9" style="background-color:#FFD7B9"></div>
                    <div class="color-button" data-color="#F9EDA6" style="background-color:#F9EDA6"></div>
                    <div class="color-button" data-color="#d4e9d6" style="background-color:#d4e9d6"></div>
                    <div class="color-button" data-color="#C7E6EA" style="background-color:#C7E6EA"></div>
                    <div class="color-button" data-color="#CCE0F1" style="background-color:#CCE0F1"></div>
                    <div class="color-button" data-color="#DAD5E9" style="background-color:#DAD5E9"></div>

                    <div class="color-button" data-color="#7B7F83" style="background-color:#7B7F83"></div>
                    <div class="color-button" data-color="#494949" style="background-color:#494949"></div>
                    <div class="color-button" data-color="#EE7976" style="background-color:#EE7976"></div>
                    <div class="color-button" data-color="#FAA573" style="background-color:#FAA573"></div>
                    <div class="color-button" data-color="#e6b322" style="background-color:#e6b322"></div>
                    <div class="color-button" data-color="#98C091" style="background-color:#98C091"></div>
                    <div class="color-button" data-color="#79C6CD" style="background-color:#79C6CD"></div>
                    <div class="color-button" data-color="#6EAAD7" style="background-color:#6EAAD7"></div>
                    <div class="color-button" data-color="#9C8EC1" style="background-color:#9C8EC1"></div>

                    <div class="color-button" data-color="#41464B" style="background-color:#41464B"></div>
                    <div class="color-button" data-color="#333333" style="background-color:#333333"></div>
                    <div class="color-button" data-color="#BE1A1D" style="background-color:#BE1A1D"></div>
                    <div class="color-button" data-color="#B95514" style="background-color:#B95514"></div>
                    <div class="color-button" data-color="#AD720E" style="background-color:#AD720E"></div>
                    <div class="color-button" data-color="#1C7231" style="background-color:#1C7231"></div>
                    <div class="color-button" data-color="#1C7892" style="background-color:#1C7892"></div>
                    <div class="color-button" data-color="#19439C" style="background-color:#19439C"></div>
                    <div class="color-button" data-color="#511B78" style="background-color:#511B78"></div>
                </div>
            </div>
        `
        let div = document.createElement('div')
        div.classList.add("toolbar-item","toolbar-drop-down","toolbar-color")
        div.innerHTML = html

        this.el.appendChild(div)

        this.fillButton = document.getElementById(id1)

        document.getElementById(id2).addEventListener('click',(event) => {
            stopPropagation(event)
            document.getElementById(id).style.display = 'block'
            parent.addEventListener('click',hide)
        })
        
        document.getElementById(id).addEventListener('click',(e) => {
            let color = e.target.dataset.color
            document.getElementById(id).style.display = 'none'
            this.emit('changeFill',{
                data:color
            })
            this.fillButton.querySelector(".color-line").style.backgroundColor = color
        })
        function hide(){
            document.getElementById(id).style.display = 'none'
            parent.removeEventListener('click',hide)
        }
    }
    initBorder(){
        const id = generateUUID()
        const id1 = generateUUID()
        const id2 = generateUUID()
        const html = `
            <svg t="1586932073278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6515" width="16" height="16"><path d="M0 0h1024v1024H0z" fill="#F6F7F8" p-id="6516"></path><path d="M0 1024V0h1024v1024H0zM916.210526 107.789474H107.789474v808.421052h808.421052V107.789474z" fill="#484D55" p-id="6517"></path><path d="M970.105263 538.947368h-431.157895v431.157895H485.052632v-431.157895H53.894737V485.052632h431.157895V53.894737h53.894736v431.157895h431.157895v53.894736z" fill="#484D55" p-id="6518"></path></svg>
            <div class="dropdown-card">
                <div class="border-button tip-wrapper" id='${id1}' data-type="false">
                    <svg t="1586932168001" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6672" width="16" height="16"><path d="M0 0h1024v1024H0z" fill="#F6F7F8" p-id="6673"></path><path d="M0 1024V0h1024v1024H0zM916.210526 107.789474H107.789474v808.421052h808.421052V107.789474z" fill="#C9C9CF" p-id="6674"></path><path d="M970.105263 538.947368h-431.157895v431.157895H485.052632v-431.157895H53.894737V485.052632h431.157895V53.894737h53.894736v431.157895h431.157895v53.894736z" fill="#C9C9CF" p-id="6675"></path></svg>
                    <div class="tip">
                        无边框
                    </div>
                </div>
                <div class="border-button tip-wrapper" id='${id2}' data-type="true">
                    <svg t="1586933085310" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7113" width="16" height="16"><path d="M0 0h1024v1024H0z" fill="#F6F7F8" p-id="7114"></path><path d="M0 1024V0h1024v1024H0zM916.210526 107.789474H107.789474v808.421052h808.421052V107.789474z" fill="#484D55" p-id="7115"></path><path d="M970.105263 538.947368h-431.157895v431.157895H485.052632v-431.157895H53.894737V485.052632h431.157895V53.894737h53.894736v431.157895h431.157895v53.894736z" fill="#484D55" p-id="7116"></path></svg>                    
                    <div class="tip">
                        所有边框
                    </div>
                </div>
            </div>
        `
        const style = document.createElement('style')
        style.innerHTML = `
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border .dropdown-card{
                display: none;
                position:absolute;
                left:50%;
                margin-left:-30px;
                width:60px;
                line-height: 22px;
                font-size:12px;
                border:1px solid #d0d0d0;
                background: #fff;
                text-align: center;
                z-index:10;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border:hover .dropdown-card{
                display: block;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border .dropdown-card:before{
                content:'';
                width:0;
                height:0;
                border-bottom:8px solid #d0d0d0;
                border-right:5px solid transparent;
                border-left:5px solid transparent;
                position:absolute;
                top:-8px;
                left:50%;
                margin-left:-5px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border .dropdown-card:after{
                content:'';
                width:0;
                height:0;
                border-bottom:8px solid #ffffff;
                border-right:5px solid transparent;
                border-left:5px solid transparent;
                position:absolute;
                top:-6px;
                left:50%;
                margin-left:-5px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border .border-button{
                position: relative;
                float:left;
                margin:4px 2px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border .border-button .tip{
                display: none;
                position:absolute;
                left:50%;
                margin-left:-35px;
                width:70px;
                line-height: 22px;
                font-size:12px;
                border:1px solid #d0d0d0;
                background: #fff;
                text-align: center;
                z-index:10;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border .border-button:hover .tip{
                display: block;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border .border-button .tip:before{
                content:'';
                width:0;
                height:0;
                border-bottom:8px solid #d0d0d0;
                border-right:5px solid transparent;
                border-left:5px solid transparent;
                position:absolute;
                top:-8px;
                left:50%;
                margin-left:-5px;
            }
            #daodao_excel_scroll_toolbar-wrapper .toolbar-border .border-button .tip:after{
                content:'';
                width:0;
                height:0;
                border-bottom:8px solid #ffffff;
                border-right:5px solid transparent;
                border-left:5px solid transparent;
                position:absolute;
                top:-6px;
                left:50%;
                margin-left:-5px;
            }
        `
        this.el.appendChild(style)

        let div = document.createElement('div')
        div.classList.add("toolbar-item","toolbar-button","toolbar-border")
        div.id = id
        div.innerHTML = html

        this.el.appendChild(div)

        this.borderButton = document.getElementById(id)

        document.getElementById(id1).addEventListener('click',(event) => {
            this.emit('changeBorder',{
                data:document.getElementById(id1).dataset.type
            })
        })
        document.getElementById(id2).addEventListener('click',(event) => {
            this.emit('changeBorder',{
                data:document.getElementById(id2).dataset.type
            })
        })
    }
    initAlignLeft(){
        this.alignLeftButton = this.addButton(
            '<svg t="1586934617479" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7837" width="16" height="16"><path d="M584.704 153.6 226.8672 153.6l0 102.0928 357.8368 0L584.704 153.6zM789.4528 357.8368 226.6112 357.8368l0 102.144 562.8416 0L789.4528 357.8368zM226.304 768.256l0 102.1952 614.3488 0 0-102.1952L226.304 768.256zM584.704 666.0608l0-102.0928L226.8672 563.968l0 102.0928L584.704 666.0608z" p-id="7838"></path></svg>',
            '左对齐',
             (e)=>{
                this.emit('changeTextAlign',{
                    data:'left'
                })
             },
             true   
        )
    }
    initAlignRight(){
        this.alignRightButton = this.addButton(
            '<svg t="1586934702347" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8391" width="16" height="16"><path d="M461.4144 153.6l0 102.0928L819.2 255.6928 819.2 153.6 461.4144 153.6zM256.3072 459.9296 819.2 459.9296 819.2 357.7856 256.3072 357.7856 256.3072 459.9296zM204.8 870.4l614.4 0 0-102.0928L204.8 768.3072 204.8 870.4zM461.4144 666.112 819.2 666.112l0-102.0928L461.4144 564.0192 461.4144 666.112z" p-id="8392"></path></svg>',
            '右对齐',
             (e)=>{
                this.emit('changeTextAlign',{
                    data:'right'
                })
             },
             true   
        )
    }
    initAlignCenter(){
        this.alignCenterButton = this.addButton(
            '<svg t="1586934902654" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8995" width="16" height="16"><path d="M162.304 186.88H865.28v63.488H162.304zM246.272 376.832h534.528V440.32H246.272zM162.304 567.296H865.28v63.488H162.304zM246.272 757.248h534.528v63.488H246.272z" fill="#000000" p-id="8996"></path></svg>',
            '居中对齐',
             (e)=>{
                this.emit('changeTextAlign',{
                    data:'center'
                })
             },
             true   
        )
    }
    initMergeCell(){
        this.mergeCellButton = this.addButton(
            '<svg t="1586934956797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9296" width="16" height="16"><path d="M401.408 522.24h-196.608v-40.96h196.608l-47.104-47.104c-8.192-8.192-8.192-20.48 0-28.672 8.192-8.192 20.48-8.192 28.672 0l96.256 96.256-96.256 96.256c-8.192 8.192-20.48 8.192-28.672 0-8.192-8.192-8.192-20.48 0-28.672l47.104-47.104z m221.184-40.96h196.608v40.96h-196.608l47.104 47.104c8.192 8.192 8.192 20.48 0 28.672-8.192 8.192-20.48 8.192-28.672 0l-96.256-96.256 96.256-96.256c8.192-8.192 20.48-8.192 28.672 0 8.192 8.192 8.192 20.48 0 28.672l-47.104 47.104z m-202.752 286.72h40.96v61.44c0 34.816-26.624 61.44-61.44 61.44h-225.28c-34.816 0-61.44-26.624-61.44-61.44v-634.88c0-34.816 26.624-61.44 61.44-61.44h225.28c34.816 0 61.44 26.624 61.44 61.44v61.44h-40.96v-61.44c0-10.24-8.192-20.48-20.48-20.48h-225.28c-10.24 0-20.48 8.192-20.48 20.48v634.88c0 12.288 8.192 20.48 20.48 20.48h225.28c10.24 0 20.48-8.192 20.48-20.48v-61.44z m143.36 0h40.96v61.44c0 12.288 8.192 20.48 20.48 20.48h225.28c10.24 0 20.48-10.24 20.48-20.48v-634.88c0-12.288-8.192-20.48-20.48-20.48h-225.28c-10.24 0-20.48 10.24-20.48 20.48v63.488h-40.96V194.56c0-34.816 26.624-61.44 61.44-61.44h225.28c34.816 0 61.44 26.624 61.44 61.44v634.88c0 34.816-26.624 61.44-61.44 61.44h-225.28c-34.816 0-61.44-26.624-61.44-61.44v-61.44z" p-id="9297"></path></svg>',
            '合并单元格',
             (e)=>{
                this.emit('mergeCell',{
                    data:true
                })
             },
             false   
        )
    }
    initSplitCell(){
        this.mergeCellButton = this.addButton(
            '<svg t="1586935001418" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9451" width="16" height="16"><path d="M882.688 522.24h-196.608v-40.96h196.608l-47.104-47.104c-8.192-8.192-8.192-20.48 0-28.672 8.192-8.192 20.48-8.192 28.672 0l96.256 96.256-96.256 96.256c-8.192 8.192-20.48 8.192-28.672 0-8.192-8.192-8.192-20.48 0-28.672l47.104-47.104z m-741.376-40.96h196.608v40.96h-196.608l47.104 47.104c8.192 8.192 8.192 20.48 0 28.672-8.192 8.192-20.48 8.192-28.672 0l-96.256-96.256 96.256-96.256c8.192-8.192 20.48-8.192 28.672 0 8.192 8.192 8.192 20.48 0 28.672l-47.104 47.104z m718.848 286.72h40.96v61.44c0 34.816-26.624 61.44-61.44 61.44h-225.28c-34.816 0-61.44-26.624-61.44-61.44v-634.88c0-34.816 26.624-61.44 61.44-61.44h225.28c34.816 0 61.44 26.624 61.44 61.44v61.44h-40.96v-61.44c0-10.24-8.192-20.48-20.48-20.48h-225.28c-10.24 0-20.48 8.192-20.48 20.48v634.88c0 12.288 8.192 20.48 20.48 20.48h225.28c10.24 0 20.48-8.192 20.48-20.48v-61.44z m-737.28 0h40.96v61.44c0 12.288 8.192 20.48 20.48 20.48h225.28c10.24 0 20.48-10.24 20.48-20.48v-634.88c0-12.288-8.192-20.48-20.48-20.48h-225.28c-10.24 0-20.48 10.24-20.48 20.48v63.488h-40.96V194.56c0-34.816 26.624-61.44 61.44-61.44h225.28c34.816 0 61.44 26.624 61.44 61.44v634.88c0 34.816-26.624 61.44-61.44 61.44h-225.28c-34.816 0-61.44-26.624-61.44-61.44v-61.44z" p-id="9452"></path></svg>',
            '取消合并',
             (e)=>{
                this.emit('splitCell',{
                    data:true
                })
             },
             false   
        )
    }
    initAddImage(){
        this.addImageButton = this.addButton(
            '<svg t="1586935088202" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9639" width="16" height="16"><path d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z" p-id="9640"></path><path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="9641"></path><path d="M32 128v768h960V128H32z m896 704H96V192h832v640z" p-id="9642"></path></svg>',
            '插入图片',
             (e)=>{
                this.emit('addImage',{
                    data:true
                })
             },
             false   
        )
    }
    addButton(innerHTML,tip,func,hasStatus){
        let dom = document.createElement('div')
        dom.classList.add("toolbar-item","toolbar-button")
        let html = `
            ${innerHTML}
            <div class="tooltip__down">
                ${tip}
            </div>
        `
        dom.innerHTML = html
        this.el.appendChild(dom)
        dom.addEventListener("click",()=>{
            if(hasStatus){
                if(dom.classList.contains('active')){
                    dom.classList.remove("active")
                    func(false)
                }else{
                    dom.classList.add("active")
                    func(true)
                }
            }else{
                func()
            }
        })
        return dom
    }
    setConfig(config){
        this.typeFaceButton.value = config.fontFamily
        this.fontSizeButton.value = config.fontSize
        this.textFillButton.querySelector(".color-line").style.backgroundColor = config.textFill
        this.fillButton.querySelector(".color-line").style.backgroundColor = config.fill
        if(config.fontWeight == 'bold'){
            this.fontWeightButton.classList.add('active')
        }else{
            this.fontWeightButton.classList.remove('active')
        }
        if(config.fontStyle == 'italic'){
            this.fontItalicButton.classList.add('active')
        }else{
            this.fontItalicButton.classList.remove('active')
        }
        if(config.textAlign == 'left'){
            this.alignLeftButton.classList.add('active')
            this.alignRightButton.classList.remove('active')
            this.alignCenterButton.classList.remove('active')
        }else if(config.textAlign == 'right'){
            this.alignRightButton.classList.add('active')
            this.alignLeftButton.classList.remove('active')
            this.alignCenterButton.classList.remove('active')
        }else if(config.textAlign == 'center'){
            this.alignCenterButton.classList.add('active')
            this.alignRightButton.classList.remove('active')
            this.alignLeftButton.classList.remove('active')
        }
    }
}

export default ToolBar