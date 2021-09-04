<template>
  <div>
    <div style='width: 400px; height: 300px; float: left; border: 1px solid red'>
      picture goes here...
    </div>
    <div style='float: left; margin-left:20px'>
      <table>
        <tr>
          <td>
            Item Name
          </td>
          <td>
            Item Value
          </td>
          <td>
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
            true/false
          </td>
        </tr>
        <tr>
          <td>
            Box list
          </td>
          <td>
            <textarea :value="JSON.stringify(box_list)"
              @input="box_list = JSON.parse($event.target.value)" >
            </textarea>
            <hr/>
            {{box_list}}
          </td>
          <td>
            Please input a standard json here, <br/>
            good:  {"key": "value"} <br/>
            bad:  {key: "value"}
          </td>
        </tr>
        <tr>
          <td>
            mouse position
          </td>
          <td>
            {{mouse_position}}
          </td>
          <td>
            This changes when your mouse moves over the canvas area
          </td>
        </tr>
        <tr>
          <td>
            Canvas Transform
          </td>
          <td>
            <textarea :value="JSON.stringify(canvas_transform)"
              @input="canvas_transform = JSON.parse($event.target.value)" >
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
    this.box_list_string = JSON.stringify(this.box_list)

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
      box_list: [{a:1}, {b:2}],
      box_list_string: '',
      current_box: {},
      refresh: false,
      mouse_position: {},
      draw_mode: false,
      canvas_transform: { scale: 1},
      show_annotations: false,
      refreshed_at: new Date()
    }
  },

  methods: {
    do_refresh(){
      console.info("do a refresh!")
      this.refreshed_at = new Date()
    },
    // TODO complete this function
    draw_circle: function (circle_size, x, y, ctx) {
    },
    to_int: function(n){
      return parseInt(n)
    },
    draw: function (ctx, done) {
      if (!this.show_annotations){
        return
      }

      let circle_size = 8 / this.canvas_transform['scale']
      let font_size = 20 / this.canvas_transform['scale']
      ctx.font = font_size + "px Verdana";

      this.draw_circle(circle_size, x, y, ctx)

      // TODO grab box_list
      let boxes = []

      for (var i in boxes) {

        let box = boxes[i]

        if (box.soft_delete != true) {
          if (box.label.is_visible == null || box.label.is_visible == true) {

            ctx.beginPath()
            ctx.lineWidth = '2'

            let r = box.label.colour.rgba.r
            // TODO get other colours


            if (box.selected == true) {
              ctx.fillStyle = "blue";
            } else {
              ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)";
            }

            ctx.textAlign = "start";

            // TODO handle if label is undefined
            ctx.fillText(box.label.name, this.toInt(box.x_min), this.toInt(box.y_min));

            // TODO draw circles (using eariler created function) at box.[x/y]_min and box.[x/y]_max

            ////



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
        }

      }
      done();

    }
  }
}
</script>

