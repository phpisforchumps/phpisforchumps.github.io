var height = window.innerHeight;
var width = window.innerWidth;

var svg = d3.select('#chumpsContainer').append('svg')
            .attr('height', height).attr('width', width);

var data = [];
for(var i = 30; i < 50; i++){
  data.push(i);
}


var update = function(position){
  // JOIN
  var texts = svg.selectAll('text').data(data.reverse());
      
  //ENTER
  texts.enter().append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', function(){
        return d3.hsl(Math.random() * 360, 0.7, 0.7).toString();
      })
      .attr('font-size', function(d){
        return d * 2 + 'px';
      })
      .attr('transform', 'translate(' + width / 2+','+ height / 2+')')
      .attr('text-anchor', 'middle')
      .attr('id', function(d){return 'text'  + d;})
      .text('php is for chumps');

  //ENTER + UPDATE    
  texts.transition().duration(function(d){
        return 10000 / (50 - d);
      })
      .attr("transform", function(){
        var newHeight = (position) ? position.y : Math.random() * height;
        var newWidth = (position) ? position.x : width / 2;
        var angle = (position) ? position.angle : Math.random() * 179;
        return 'translate(' + newWidth +','+ newHeight +') rotate(' + angle + ')';
      });
      
  // EXIT
  texts.exit().remove();
};

update();
d3.select('#text30').on('mouseover', function(d){
    this.setAttribute('stroke', 'steelBlue');
    this.setAttribute('stroke-width', 2);
  })
  .on('mouseleave', function(d){
    this.setAttribute('stroke', 'none');
    this.setAttribute('stroke-width', 0);
  })
  .on('click', function(){
    window.open('https://www.google.com/search?q=php+is+for+chumps&biw=908&bih=805&source=lnms&tbm=isch&sa=X&ei=zjpzVYaGFMeZoQT7_oCACg&ved=0CAcQ_AUoAQ#tbm=isch&q=you+chump');
  });
  
var counter = 0;
setInterval(function(d){
  counter += 1;
  if(counter === 2){
    counter = 0;
    update({x: width / 2, y: height / 2, angle: 0});
  } else {
    update();
  }
}, 1000);
