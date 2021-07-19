(()=>{"use strict";var t;!function(t){t[t.AIR=0]="AIR",t[t.WALL=1]="WALL",t[t.PATH=2]="PATH",t[t.START=3]="START",t[t.FINISH=4]="FINISH"}(t||(t={}));var e=function(){function e(e,n,r,i){this.number=0,this.wasPath=!1,this.type=e,this.x=n,this.y=r,this.board=i,e==t.PATH&&(this.wasPath=!0)}return e.prototype.getNeighbors=function(){var t=new Array;return this.x>0&&t.push(this.board.grid[this.x-1][this.y]),this.x<this.board.grid.length-1&&t.push(this.board.grid[this.x+1][this.y]),this.y>0&&t.push(this.board.grid[this.x][this.y-1]),this.y<this.board.grid[0].length-1&&t.push(this.board.grid[this.x][this.y+1]),t},e}(),n=function(){function n(n,r){this.width=n.canvas.width,this.height=n.canvas.height,this.columns=Math.floor(this.width/r),this.rows=Math.floor(this.height/r),this.ctx=n,this.cellLength=r,this.grid=new Array;for(var i=0;i<this.columns;i++){this.grid.push([]);for(var o=0;o<this.rows;o++){var l=t.AIR;0==i&&0==o?l=t.START:i==this.columns-1&&o==this.rows-1&&(l=t.FINISH),this.grid[i][o]=new e(l,i,o,this)}}}return n.prototype.forEachCell=function(t){var e=this;this.grid.forEach((function(n,r){return n.forEach((function(n,i){return t(e.grid[r][i])}))}))},n.prototype.clearBoard=function(e){this.fillBoard(t.AIR,e),this.forEachCell((function(t){return t.number=0}))},n.prototype.fillBoard=function(e,n){this.forEachCell((function(r){n.includes(r.type)||(r.wasPath=e==t.PATH,r.type=e)}))},n.prototype.findCells=function(t){var e=new Array;return this.grid.forEach((function(n){return n.filter(t).forEach((function(t){return e.push(t)}))})),e},n.prototype.findAndReplace=function(t,e){this.findCells((function(e){return t.includes(e.type)})).forEach((function(t){return t.type=e}))},n.prototype.renderCell=function(e,n){var r="";switch(this.grid[e][n].type){case t.AIR:this.ctx.fillStyle="white",r="black";break;case t.WALL:this.ctx.fillStyle="black",r="white";break;case t.START:this.ctx.fillStyle="red",r="white";break;case t.FINISH:this.ctx.fillStyle="green",r="black";break;case t.PATH:this.ctx.fillStyle="yellow",r="black"}this.ctx.clearRect(e*this.cellLength,n*this.cellLength,this.cellLength,this.cellLength),this.ctx.strokeStyle="gray",this.ctx.fillRect(e*this.cellLength,n*this.cellLength,this.cellLength,this.cellLength),this.ctx.strokeRect(e*this.cellLength,n*this.cellLength,this.cellLength,this.cellLength),this.ctx.fillStyle=r;var i=e*this.cellLength;switch(this.grid[e][n].number.toString().length){case 1:i+=this.cellLength/3;break;case 2:i+=this.cellLength/4;break;case 4:i+=this.cellLength/5.5}document.getElementById("show-calculations-checkbox").checked&&this.ctx.fillText(this.grid[e][n].number.toString(),i,n*this.cellLength+this.cellLength/4.5*3,this.cellLength)},n.prototype.render=function(){var t=this,e=Date.now();this.forEachCell((function(e){t.renderCell(e.x,e.y)}));var n=Date.now();console.log("Rendered all cells in: "+(n-e)/1e3+" seconds")},n.prototype.export=function(){return this.grid.map((function(t){return t.map((function(t){return t.type})).join(",")})).join(":")},n.prototype.import=function(n){var r=this,i=function(t,e){for(var n=0,r=e.length,i=t.length;n<r;n++,i++)t[i]=e[n];return t}([",",":"],Object.keys(t).filter((function(t){return!isNaN(parseInt(t))})));if(!n.split("").every((function(t){return i.includes(t)})))return!1;var o=n.split(":");if(o.length!=this.columns)return!1;if(!o.every((function(t){return t.includes(",")&&t.split(",").length==r.rows})))return!1;var l=!1,h=!1,c=!1;return o.forEach((function(n,i){return n.split(",").forEach((function(n,o){if(parseInt(n)==t.START.valueOf()){if(l)return c=!0,!1;l=!0}if(parseInt(n)==t.FINISH.valueOf()){if(h)return c=!0,!1;h=!0}r.grid[i][o]=new e(t[t[parseInt(n)]],i,o,r)}))})),!c&&(this.render(),!0)},n}(),r=function(){function e(t){this.board=t}return e.prototype.map=function(e,n){var r=this;if(!this.board.findCells((function(e){return e.type==t.START})).length||!this.board.findCells((function(e){return e.type==t.FINISH})).length)return!1;this.board.forEachCell((function(e){e.number=0,n&&e.type==t.PATH&&(e.type=t.AIR)})),this.board.render();for(var i=[this.board.findCells((function(e){return e.type==t.START}))[0]],o=new Array,l=Date.now();!o.find((function(e){return e.type==t.FINISH}))&&i.length;)o=new Array,i.forEach((function(n){n.getNeighbors().filter((function(e){return 0==e.number&&![t.START,t.WALL].includes(e.type)})).forEach((function(t){t.number=n.number+1,e&&r.board.renderCell(t.x,t.y),o.push(t)}))})),i=Object.assign([],o);if(!i.length)return this.board.forEachCell((function(t){return t.number=0})),this.board.render(),!1;var h=Date.now();return console.log("Found finish in: "+(h-l)/1e3+" seconds"),e||this.board.render(),!0},e.prototype.path=function(e){if(!this.board.findCells((function(e){return e.type==t.START})).length||!this.board.findCells((function(e){return e.type==t.FINISH})).length)return!1;this.board.forEachCell((function(e){e.type==t.PATH&&(e.type=t.AIR)})),this.board.render();for(var n=this.board.findCells((function(e){return e.type==t.FINISH}))[0];n.type!=t.START;){var r=n.getNeighbors().filter((function(e){return e.type==t.START||e.type==t.AIR&&e.number>0})).sort((function(t,e){return t.number-e.number}))[0];if(!r)return!1;if(r.type==t.START){if(e)return this.board.renderCell(r.x,r.y),!0;n=r}else r.type=t.PATH,e&&this.board.renderCell(r.x,r.y),n=r}return e||this.board.render(),!0},e}(),i=document.getElementById("canvas"),o=i.getContext("2d");o.translate(.5,.5);var l=new n(o,20),h=new r(l),c=-1;l.render(),document.getElementById("clear-walls-btn").onclick=function(){l.findAndReplace([t.WALL],t.AIR),l.render()},document.getElementById("clear-path-btn").onclick=function(){l.findAndReplace([t.PATH],t.AIR),l.render()},document.getElementById("force-render-btn").onclick=function(){l.render()},document.getElementById("find-path-btn").onclick=function(){if(!h.map(!0,!0))return alert("Could not find a path(Mapping)");h.path(!0)||alert("Could not find a path(Pathing)")},document.getElementById("show-calculations-checkbox").onclick=function(t){t.target.checked&&h.map(!1,!1),l.render()},i.addEventListener("contextmenu",(function(t){return t.preventDefault()}));var s=function(t,e,n){this.button=t,this.clientX=e,this.clientY=n};window.onmouseup=function(){c=-1},window.onmousedown=function(t){c=t.button,a(new s(c,t.clientX,t.clientY))},window.onmousemove=function(t){c>=0&&a(new s(c,t.clientX,t.clientY))};var a=function(e){var n=e.clientX-i.getBoundingClientRect().x,r=e.clientY-i.getBoundingClientRect().y;if(!(n<=0||r<=0||n>i.width||r>i.height)){var o=Math.floor(n/l.cellLength),h=Math.floor(r/l.cellLength);switch(null==l.grid[o][h]&&console.log("invalid location"),e.button){case 0:if([t.START,t.FINISH,t.WALL].includes(l.grid[o][h].type))break;l.grid[o][h].type==t.PATH&&(l.grid[o][h].wasPath=!0),l.grid[o][h].type=t.WALL;break;case 2:if(l.grid[o][h].type!=t.WALL)break;l.grid[o][h].type=l.grid[o][h].wasPath?t.PATH:t.AIR;break;default:return}l.renderCell(o,h)}};document.getElementById("export-btn").onclick=function(){var t=document.getElementById("export-textarea");t.hidden=!1,t.value=l.export(),t.select()},document.getElementById("export-textarea").addEventListener("focusout",(function(){document.getElementById("export-textarea").hidden=!0})),document.getElementById("import-btn").onclick=function(){var t=prompt("Paste your board data here(Use the export button to get the board data):");t&&(l.import(t)||alert("Invalid data. Either there are invalid characters or there are multiple starts/finishes"))}})();