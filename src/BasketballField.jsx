import './Field.css';
import {useEffect} from "react";
import { ReactSVG } from "react-svg";

export function BasketballField() {
   /* useEffect(() => {
            const main_color = '#314753'
            const sub_color = '#6d8594'
            const white = '#FFF'
            const canvas = document.getElementById('field-canvas')
            const ctx = canvas.getContext('2d')
            ctx.lineWidth = 3;
            ctx.globalAlpha = 1;
            const width = canvas.width
            const height = canvas.height

            function draw_field() {
                ctx.beginPath()
                ctx.fillStyle = sub_color
                ctx.fillRect(0, 0, width, height)
                ctx.fillStyle = main_color
                ctx.fillRect(width * 0.02, height * 0.02, width * 0.96, height * 0.96)
                ctx.strokeStyle = white
                ctx.fillStyle = white
                ctx.strokeRect(width * 0.02, height * 0.02, width * 0.96, height * 0.96)
                ctx.strokeRect(width * 0.02, height * 0.02, width * 0.96 / 2, height * 0.96)
                ctx.arc(width / 2, height / 2, 360/1900*height/2, 0, 2 * Math.PI)
                ctx.fill()

                ctx.fillStyle = 'FFFFFF'


            }

            draw_field()
        }
    )*/
    return (
        <div id="FieldContainer">
            <ReactSVG src="aboba.svg" />
            {/*<canvas id="field-canvas" width="1920" height="1080">


            </canvas>*/}
            {/*<img src = "basket_field.png" alt={"asd"}/>*/}
        </div>
    );
}