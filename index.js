document.querySelector("#cheek_left").style.left = "647px";
document.querySelector("#cheek_left").style.top = "388px";
document.querySelector("#cheek_right").style.left = "859px";
document.querySelector("#cheek_right").style.top = "396px";
document.querySelector("#HADA").style.left = "477px";
document.querySelector("#HADA").style.top = "501px";
document.querySelector("#LAST_OF_HAIR").style.left = "277px";
document.querySelector("#LAST_OF_HAIR").style.top = "189px";
document.querySelector("#LEFT_MATU").style.left = "636px";
document.querySelector("#LEFT_MATU").style.top = "302px";
document.querySelector("#LEFT_MAYU").style.left = "646px";
document.querySelector("#LEFT_MAYU").style.top = "326px";
document.querySelector("#LEFT_ME").style.left = "714px";
document.querySelector("#LEFT_ME").style.top = "380px";
document.querySelector("#LEFT_ME_HIGHLIGHT").style.left = "713px";
document.querySelector("#LEFT_ME_HIGHLIGHT").style.top = "378px";
document.querySelector("#LEFT_SYOKKAKU").style.left = "643px";
document.querySelector("#LEFT_SYOKKAKU").style.top = "233px";
document.querySelector("#MATH").style.left = "792px";
document.querySelector("#MATH").style.top = "468px";
document.querySelector("#PING").style.left = "848px";
document.querySelector("#PING").style.top = "125px";
document.querySelector("#RIGHT_MATU").style.left = "849px";
document.querySelector("#RIGHT_MATU").style.top = "307px";
document.querySelector("#RIGHT_MAYU").style.left = "857px";
document.querySelector("#RIGHT_MAYU").style.top = "330px";
document.querySelector("#RIGHT_ME").style.left = "880px";
document.querySelector("#RIGHT_ME").style.top = "378px";
document.querySelector("#RIGHT_ME_HIGHLIGHT").style.left = "882px";
document.querySelector("#RIGHT_ME_HIGHLIGHT").style.top = "384px";
document.querySelector("#RIGHT_SYOKKAKU").style.left = "919px";
document.querySelector("#RIGHT_SYOKKAKU").style.top = "281px";
document.querySelector("#RINKAKU").style.left = "568px";
document.querySelector("#RINKAKU").style.top = "210px";
document.querySelector("#SECOND_USHIRO_KAMI").style.left = "350px";
document.querySelector("#SECOND_USHIRO_KAMI").style.top = "220px";
document.querySelector("#SHITA").style.left = "611px";
document.querySelector("#SHITA").style.top = "586px";
document.querySelector("#TOP_ATAMA").style.left = "580px";
document.querySelector("#TOP_ATAMA").style.top = "99px";
document.querySelector("#UE").style.left = "438px";
document.querySelector("#UE").style.top = "599px";
document.querySelector("#USHIROKAMI").style.left = "378px";
document.querySelector("#USHIROKAMI").style.top = "454px";

window.addEventListener('load', () => {
    var objects = document.querySelectorAll("img");

    objects.forEach((element) => {
        const position_info = { x: parseInt(element.style.left.replace("px", "")), y: parseInt(element.style.top.replace("px", "")) }
        const mouse_info = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        element.style["aspect-ratio"] = `${element.naturalWidth}/${element.naturalHeight}`;
        var ver, hor, sign
        if (element.classList.contains("tuiteiku") || element.classList.contains("inverted_tuiteiku")) {
            ver = 20
            hor = 3
            sign = -1
            if (element.classList.contains("inverted_tuiteiku")) {
                sign = 1
            }
        } else if (element.classList.contains("more_tuiteiku")  || element.classList.contains("inverted_more_tuiteiku")) {
            ver = 30
            hor = 8
            sign = -1
            if (element.classList.contains("inverted_more_tuiteiku")) {
                sign = 1
            }
        } else if (element.classList.contains("middle_tuiteiku")) {
            ver = 5
            hor = 3
            sign = -1
        } else {
            ver = 0
            hor = 0
            sign = 0
        }

        var down = 0

        const mainloop = () => {
            const multiplyer = window.innerHeight / 1200;

            element.height = element.naturalHeight * multiplyer;

            let y = position_info.y + (Math.min(hor, Math.abs((position_info.y - mouse_info.y) / window.innerHeight) * hor) * Math.sign(position_info.y - mouse_info.y)) * sign;
            let x = position_info.x + (Math.min(ver, Math.abs((position_info.x - mouse_info.x) / window.innerWidth) * ver) * Math.sign(position_info.x - mouse_info.x)) * sign;

            y += down
            element.style.top = `${y * multiplyer}px`;
            element.style.left = `${x * multiplyer}px`;
            requestAnimationFrame(mainloop)
        }
        requestAnimationFrame(mainloop)

        // ポインターを追ってみる。
        if (sign != 0) {
            document.addEventListener('pointermove', ((ev) => {
                mouse_info.x = ev.clientX
                mouse_info.y = ev.clientY
            }))
        }
        function increment(){
            down = Math.min(40, down + 1)
        }
        function decrement(){
            down = Math.max(0, down - 1)
        }

        // 目をつむる
        document.addEventListener('pointerdown', () => {
            if (element.id === "LEFT_MATU" || element.id === "RIGHT_MATU"){
                console.log("increment")
                const increment_id = setInterval(increment, 20)

                // document要素にイベント登録することで、クリックした後ボタンから動かしてもOK
                // once: true を指定して一度発火したらイベントを削除する
                document.addEventListener('pointerup', () => {        
                    clearInterval(increment_id)
                    console.log("decrement")
                    const decrement_id = setInterval(decrement, 20)
                    document.addEventListener('pointerdown', () => {
                        clearInterval(decrement_id)
                    })
                }, { once: true })
            }
            
        })
    });
})