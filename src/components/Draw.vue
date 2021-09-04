<template>
  <div>
    <div style='width: 800px; height: 380px; float: left; border: 1px solid red;
    background-image: url("./static/bg.jpg")
      '>
      <canvas id='my_canvas'>
      </canvas>
    </div>
    <div style='float: left; margin-left:20px; width: 800px'>
      <table style='width: 100%'>
        <tr>
          <td style="width: 100px">
            Item Name
          </td>
          <td style="width: ">
            Item Value
          </td>
          <td style="width: 300px">
            Explain
          </td>
        </tr>
        <tr>
          <td>
            Draw Mode
          </td>
          <td>
            <input type="text" v-model="draw_mode" />
          </td>
          <td>
            true/false
          </td>
        </tr>
        <tr>
          <td>
            Show Annotations
          </td>
          <td>
            <input type="text" v-model="show_annotations" />
          </td>
          <td>
            true: show the annotations(rectangles, text..) <br/>
            false: hidden
          </td>
        </tr>
        <tr>
          <td>
            Box list
          </td>
          <td>
            <textarea :value="JSON.stringify(box_list, null,4 )"
              @input="box_list = JSON.parse($event.target.value)"
                               style='width: 300px; height: 100px'
              >
            </textarea>
            <hr/>
            {{box_list}}
          </td>
          <td>
            Please input a standard json here, <br/>
            good:  {"key": "value"} <br/>
            bad:  {key: "value"} <br/>
            If the actual value changed once you change the text, it shows that
            your input is valid JSON string.
          </td>
        </tr>
        <tr>
          <td>
            Canvas Transform
          </td>
          <td>
            <textarea :value="JSON.stringify(canvas_transform)"
              @input="canvas_transform = JSON.parse($event.target.value)"
                               style='width: 300px; height: 40px'
                               >
            </textarea>
            <hr/>
            {{canvas_transform}}
          </td>
          <td>
            This will affect both text and circle size
          </td>
        </tr>
        <tr>
          <td>
            Refresh the canvas?
          </td>
          <td>
            <input type="button" @click="do_refresh" value='Refresh'/>
          </td>
          <td>{{refreshed_at}}</td>
        </tr>
        <tr>
          <td>
            mouse position
          </td>
          <td>
            {{mouse_position}}
          </td>
          <td>
            This changes when your mouse moves over the canvas area <br/>

            if the mouse position is within the rectangle and/or circles<br/>
            we drew
            emit an event 'box_hover', with the current index 'i', x, y
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>
<script>

/*
 * Instructions: complete all TODOs.
 *
 * Feel free to upgrade the code if you see areas of opportunity.
 * (Don't assume the starter code is good.)
 *
 * This VueJS component draws boxes on an HTML canvas
 * See boxes example image in folder
 * A box is defined by it's min and max x/y points.
 *
 * Bonus points - mock up input data and construct a test case.
 *
*/

import Vue from 'vue'
export default {
  mounted() {
    console.info("== refresh: ", this.refresh)

  },

  /* ord, order of drawing on canvas
   * box_list, list of dictionaries,
   * current_box, dictionary,
   * refresh, integer / hack for forcing reactive property change
   * mouse_position, dictionary, x, y
   * draw_mode, boolean
   * canvas_transform, dictionary,
   * show_annotations, boolean
   * */
  data(){
    return {
      ord: 0,
      box_list: [
        {"x_min":50, "y_min": 50, "x_max": 100, "y_max": 200, "special_condition": false,"soft_delete":false,"selected":false,"label":{"name":"test","is_visible":true,"colour":{"rgba":{"r":255,"g":255,"b":255}, "hex": "0XFFFF"}}},
        {"x_min":50, "y_min": 50, "x_max": 100, "y_max": 200, "special_condition": false,"soft_delete":false,"selected":false,"label":{"name":"test","is_visible":true,"colour":{"rgba":{"r":255,"g":255,"b":255}, "hex": "0XFFFF"}}}
        ],
      current_box: {},
      refresh: false,
      mouse_position: {},
      draw_mode: false,
      canvas_transform: { scale: 1},
      show_annotations: true,
      refreshed_at: new Date()
    }
  },

  methods: {
    do_refresh(){
      console.info("do a refresh!")
      this.refreshed_at = new Date()
      let ctx = document.getElementById('my_canvas').getContext('2d')
//      this.draw_circle(10, 35, 55, ctx)
      this.draw(ctx, function(){ alert("done!")} )
    },
    // TODO complete this function
    draw_circle: function (circle_size, x, y, ctx) {

      ctx.beginPath();
      ctx.arc(x, y, circle_size, 0, 2*Math.PI);
      ctx.strokeStyle="yellow"
      ctx.stroke();

      ctx.fillStyle="green"
      ctx.fill()
    },
    toInt: function(n){
      return parseInt(n)
    },
    draw: function (ctx, done) {
      /*
      REFACTOR:
      if(this.show_annotations == true) { ...
      */
      if (!this.show_annotations){
        return
      }

      let circle_size = 8 / this.canvas_transform['scale']
      let font_size = 20 / this.canvas_transform['scale']
      ctx.font = font_size + "px Verdana";

      let boxes = this.box_list

      for (var i in boxes) {

        let box = boxes[i]

        // REFACTOR:
        /*
        if (box.soft_delete != true) {
          if (box.label.is_visible == null || box.label.is_visible == true) {
          ...
        */
        if (box.soft_delete || !box.label.is_visible) {
          continue
        }

        ctx.beginPath()
        ctx.lineWidth = '2'
        this.draw_circle(circle_size, box.x_min, box.y_min, ctx)

        let r = box.label.colour.rgba.r
        let g = box.label.colour.rgba.g
        let b = box.label.colour.rgba.b

        if (box.selected) {
          ctx.fillStyle = "blue";
        } else {
          ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)";
        }

        ctx.textAlign = "start";

        // TODO handle if label is undefined
        ctx.fillText(box.label.name, this.toInt(box.x_min), this.toInt(box.y_min));

        // TODO draw circles (using eariler created function) at box.[x/y]_min and box.[x/y]_max
        this.draw_circle(circle_size, box.x_max, box.y_max, ctx)

        // TODO draw dashed line if special condition is true else draw solid line

        if (box.special_condition == true) {

        } else {

        }

        ctx.fill()

        ctx.fillStyle = '' // TODO RGBA fill style

        // TODO draw rectangle

        ctx.fill()

        ctx.closePath()

        if (!this.draw_mode) {
          if (true) {
            /* TODO
             * if the mouse position is within the rectangle and/or circles we drew
             * emit an event 'box_hover', with the current index 'i',
             * this.mouse_position.raw.x and this.mouse_position.raw.y
             * */
          }
        }


        if (box.selected == true) {
          ctx.strokeStyle = "blue"
        } else {
          ctx.strokeStyle = box.label.colour.hex
        }
        ctx.stroke()


      }
      done();

    }
  }
}
</script>

