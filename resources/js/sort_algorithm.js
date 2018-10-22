var testlist=[7, 3, 1, 2, 9];
var worklist = [];
var total_steps = 0;


document.addEventListener('DOMContentLoaded', function() {
    list_size_changed(3);
});


var svg_id = document.getElementById("orig-state");
var svgpc_id = document.getElementById("moving-state");

var svgpc_height = svgpc_id.clientHeight;
var svg_height = svg_id.clientHeight;
var svg_width = svg_id.clientWidth;
    

var svg = d3.select("#orig-state");
var svgpc = d3.select("#moving-state");


var 
//svg_width = 700,
//    svg_height = 150,
//    svgpc_height = 250,
    width = 30,
    padding_bottom = 30,
    padding_left = 5,
    scale = 2;

function generate_list(size, sorttype) {
    function compareNumbers(a, b) {
        return a - b;
    }
    var list = [];
    
    list = Array.from({length: size}, () => Math.floor(Math.random() * (size*2)));
    if (sorttype == 2) {
        list.sort(function(b, a) {
            return a - b;
        });
    }
    else if (sorttype == 3) {
        list.sort(function(a, b) {
            return a - b;
        });
    }

    return list;
}

function change_sort_method(sortmethod) {
  var text="";
  var sort_title = document.getElementById("sort-method-title");
  switch (sortmethod) {
      case 1: 
          text="Bubble Sort";
          break;
      case 2: 
          text="Insertion Sort";
          break;
      case 3: 
          text="Merge Sort";
          break;
      case 4: 
          text="Other Sort";
          break;
          
  }

  sort_title.innerHTML = text;
  sort_type_changed(sortmethod);
}

function sort_type_changed(sorttype) {
//    var slider_size = document.getElementById("currentSlidevalue");
//    listsize = slider_size.innerHTML;

    initializeWorkArea();    
}

function list_size_changed(new_value) {
    var slider_size = document.getElementById("currentSlidevalue");
    slider_size.innerHTML = new_value;


    initializeWorkArea();
//    Random, Incremental or Decremental
//    var testcase = document.querySelector('input[name="testcase"]:checked').value;
//    initializeWorkArea(new_value, testcase);    
}

function call_initializeWorkArea() {
    throw new initializeWorkArea();
}

function initializeWorkArea() {
    var slider_size = document.getElementById("currentSlidevalue");
    listsize = slider_size.innerHTML;
    var sorttype = document.querySelector('input[name="testcase"]:checked').value;

    worklist = generate_list(listsize, sorttype)    
    drawOriginalBlocks(worklist);
    svgpc.selectAll("*").remove();  
    updateSteps(0);
    total_steps = 0;
}


function drawOriginalBlocks(worklist) {
    var max_item = Math.max(...worklist);
    var bar_height = Math.round(svg_height / max_item) - 1;

    svg.selectAll("*").remove();
    var counter=0;
    for (let value of worklist) {
        // Boxes in small size, just to show original, or starting point,
        // of visual sort algorithm
        svg.append("rect")
            .attr("width", width)
            .attr("height", value*bar_height)
            .attr("x", width*counter+padding_left*(counter+1))
            .attr("y", svg_height-value*bar_height)
            .style("fill", "none")
            .style("stroke","black")
        ;
        
        // Add value (number) to previous boxes
        svg.append("text")
        .append("tspan")
        .attr("x", getXtext(value, counter))
        .attr("y", svg_height-2)
        .text(value)
         ;

        counter+=1;
    }
}

function getXtext(value, counter) {
     if (value > 9) {
         console.log((width*counter+(width)/2+padding_left*(counter))-5);
        return (width*counter+(width)/2+padding_left*(counter))-5; 
     }
     else {
        return width*counter+(width)/2+padding_left*(counter);
     }
}

function drawWorkBlocks(worklist) {
    svgpc.selectAll("*").remove();
    var max_item = Math.max(...worklist);
//    var bar_height = Math.round(svg_height / max_item) - 1;
    var bar_height_process = Math.round((svgpc_height-padding_bottom) / max_item)-1;
    width = Math.round((svg_width / worklist.length) - padding_left)-1;
    if (width > 50) width=30;

    var counter=0;
    for (let value of worklist) {
        // Boxes in scaled size (configurable), that will visually move to
        // represent the sorting step by step
        svgpc.append("rect")
            .attr("id", "block_"+counter)
            .attr("width", width)
            .attr("height", value*bar_height_process)
            .attr("x", width*counter+padding_left*(counter+1))
            .attr("y", svgpc_height-padding_bottom-value*bar_height_process)
            .style("fill", "none")
            .style("stroke","black")
            .style("stroke-width", 2);
        
        // Values of boxes
        svgpc.append("text")
            .append("tspan")
            .attr("id", "btext_"+counter)
            .attr("x", getXtext(value, counter))
            .attr("y", svgpc_height-padding_bottom-3)
            .text(value);
        
        counter+=1;
    }
    
    svgpc.append("rect")
        .attr("id", "bubble")
        .attr("width", width*2+padding_left+4)
        .attr("height", svgpc_height-padding_bottom+2)
        .attr("x", 3)
        .attr("y", 2)
        .style("fill", "none")
        .style("stroke","#b5b5b5")
        .style("stroke-width", 2)
        ;
    
}

function drawMergeBlocks(list, posx, posy) {
//    svgpc.selectAll("*").remove();
//    var bar_height = Math.round(svg_height / max_item) - 1;
//    var bar_height_process = Math.round((svgpc_height-padding_bottom) / max_item)-1;
//    width = Math.round((svg_width / list.length) - padding_left)-1;
//    if (width > 50) width=30;

    var size = 30;
    var x = posx - (list.length*size);
    var counter=0;
    for (let value of list) {
        // Boxes in scaled size (configurable), that will visually move to
        // represent the sorting step by step
        var x_text = 0;
        if (value > 9) {
           x_text = x + (size*counter+(size/2))-5- padding_left; }
        else {
           x_text = x + size*counter+(size)/2 - padding_left; }

        svgpc.append("rect")
            .attr("id", "block_"+value)
            .attr("width", size)
            .attr("height", size)
            .attr("x", x + size*counter+1)
            .attr("y", posy+size)
            .style("fill", "none")
            .style("stroke","black")
            .style("stroke-width", 2);
        
        // Values of boxes
        svgpc.append("text")
            .append("tspan")
            .attr("id", "btext_"+value)
            .attr("x", x_text+1)
            .attr("y", posy+size+22)
            .text(value);
        
        counter+=1;
    }
    
}


function swap_and_draw(i, j) {
    d3.select("#block_"+i)
        .attr("id","block_tmp")
        .transition().duration(400)
        .attr("transform", "translate(0, -15)")
        .transition().duration(400)
        .attr("x", width*(j)+padding_left*(j+1))
        .transition().duration(400)
        .attr("transform", "translate(0, 0)");

    d3.select("#btext_"+i)
        .attr("id","btext_tmp")
        .transition().duration(400)
        .attr("transform", "translate(0, -15)")
        .transition().duration(400)
    
        .attr("x",getXtext(worklist[j], j))
        .transition().duration(400)
        .attr("transform", "translate(0, 0)");
    
    d3.select("#block_"+j)
        .attr("id", "block_"+i)
        .transition().duration(1200)
        .attr("x", width*(i)+padding_left*(j));

    d3.select("#btext_"+j)
        .attr("id", "btext_"+i)
        .transition().duration(1200)
        .attr("x",getXtext(worklist[i], i))
    
    d3.select("#block_tmp").attr("id","block_"+j);
    d3.select("#btext_tmp").attr("id","btext_"+j);
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function updateSteps(step_counter) {
    var stepCounter = document.getElementById("step-counter");
    stepCounter.innerHTML = step_counter;
}

let bubble_sort = async function() {
    for (j=0; j<(worklist.length-1); j++) {
        for (i=0; i<(worklist.length-1-j); i++) {
            d3.select("#bubble").attr("x", (width+padding_left)*i + padding_left - 2);
//        console.log("i: ",i," j: ",j);
            ++total_steps;
            updateSteps(total_steps);
            if (worklist[i] > worklist[i+1]) {
                d3.select("#bubble").style("stroke","red");
                swap_and_draw(i, i+1);
                tmp = worklist[i];
                worklist[i] = worklist[i+1];
                worklist[i+1] = tmp;
            }
            else {
                d3.select("#bubble").style("stroke","#07b707")
                    .transition().duration(1200)
                    .style("stroke","#b5b5b5");
            }
            await sleep(1300);
        }
        d3.select("#block_"+(i)).style("fill","lightgray");
    }
    d3.select("#block_"+(0)).style("fill","lightgray");
}

let insertion_sort = async function() {
    // we skip first element, asume it the starting point of sort
    d3.select("#block_0").style("fill", "lightgray");
    for (j = 1; j < worklist.length; j++) {
        console.log("j: ",j);
        d3.select("#bubble").attr("x", (width+padding_left)*(j-1) + padding_left - 2);
        var value = worklist[j];
        i = j-1;
        while ((i > -1) && (worklist[i] > value)) {
            d3.select("#bubble").attr("x", (width+padding_left)*(i) + padding_left - 2);
            d3.select("#bubble").style("stroke","red");
            ++total_steps;
            updateSteps(total_steps);
            swap_and_draw(i, i+1);
            worklist[i+1] = worklist[i];
            i -= 1;
            await sleep(1300);
        }
        await sleep(500);
        d3.select("#bubble").style("stroke","#07b707")
            .transition().duration(1200)
            .style("stroke","#b5b5b5");
        worklist[i+1] = value;
        console.log("j: ",j, worklist);
        d3.select("#block_"+(i+1)).style("fill", "lightgray");
        console.log("Changed j: ",j)
    }
}

//function merge(left, right) {
let merge = async function(left, right) {
    result = [];
    console.log('Doing ', left, right);
    var l_idx=0, r_idx=0;
//    var leftpos = parseInt(d3.select("#block_"+left[0]).attr("x"));
    var posy = parseInt(d3.select("#block_"+left[0]).attr("y"));
    var offText=18;
    var offY=40;
    while ((l_idx < left.length) && (r_idx < right.length)) {

        var left_value = left[l_idx];
        var right_value = right[r_idx];

        var leftblock = d3.select("#block_"+left_value);
        var rightblock = d3.select("#block_"+right_value);
        var leftblocktxt = d3.select("#btext_"+left_value);
        var rightblocktxt = d3.select("#btext_"+right_value);
        var leftpos=parseInt(leftblock.attr("x"));
        var rightpos=parseInt(rightblock.attr("x"));
        console.log('l_val',left_value, 'r_val', right_value, result, posy);
//        console.log('lf.x: '+leftblock.attr("x"), "rt.x: "+rightblock.attr("x"));

        //        leftblock.style("stroke", "red");
//        rightblock.style("stroke", "red");
        if (left_value <= right_value) {
//            var leftpos=parseInt(leftblock.attr("x"));
            if (right_value > 9) {
               x_text = leftpos + (30/2) - 5 - padding_left; }
            else {
               x_text = leftpos + (30/2) - padding_left; }
            
            console.log("lf < rt :", left_value, right_value, leftpos);
            result.push(left_value);
            
            rightblock.transition().duration(600)
                .attr("x", leftpos+30).attr("y", posy-offY);
            rightblocktxt.transition().duration(600)
                .attr("x", x_text+30).attr("y", posy-offText);
            
            ++l_idx;
        }
        else {
//            var leftpos=parseInt(leftblock.attr("x"));
            if (left_value > 9) {
               x_text = leftpos + (30/2) - 5 - padding_left; }
            else {
               x_text = leftpos + (30/2) - padding_left; }
            
            console.log("rt < lf :", left_value, right_value, leftpos);
//    d3.select("#block_"+i)
//        .attr("id","block_tmp")
//        .transition().duration(400)
//        .attr("transform", "translate(0, -15)")
//        .transition().duration(400)
//        .attr("x", width*(j)+padding_left*(j+1))
//        .transition().duration(400)
//        .attr("transform", "translate(0, 0)");

            rightblock
                .attr("x", leftpos)
                .attr("y", posy-offY);
//                .attr("transform", "translate("+(leftpos-rightpos)+", -"+offY+")")
            
            rightblocktxt.transition().duration(500)
                .attr("x", leftblocktxt.attr("x"))
                .attr("y", posy-offText);
        await sleep(800);

            leftblock
//                .transition().duration(600)
//                .attr("transform", "translate("+(30)+", -"+offY+")")
                .attr("x", leftpos+30)
                .attr("y", posy-offY);
            
            leftblocktxt.transition().duration(500)
                .attr("x", x_text+30)
                .attr("y", posy-offText);
            
        await sleep(800);
            result.push(right_value);
            ++r_idx;
        }
        leftblock.transition().duration(400)
            .style("stroke", "black");
        rightblock.transition().duration(400)
            .style("stroke", "black");
        await sleep(800);
    }
    if (left) {
        var listtoconcat=left.slice(l_idx);
        console.log("Left: ", left, result, l_idx, listtoconcat);
        if (listtoconcat.length > 0) {
            var leftblock= parseInt(d3.select("#block_"+result[result.length-1]).attr("x"));
            var rightblock= parseInt(d3.select("#block_"+listtoconcat[0]).attr("x"));
            moveMergeBlocks(listtoconcat, -(leftblock-rightblock), offY);
        }
        result = result.concat(listtoconcat);
    }
    if (right) {
        var listtoconcat=right.slice(r_idx);
        console.log("Right: ", right, result, r_idx, listtoconcat);
        if (listtoconcat.length > 0) {
            var leftblock= parseInt(d3.select("#block_"+result[result.length-1]).attr("x"));
            var rightblock= parseInt(d3.select("#block_"+listtoconcat[0]).attr("x"));
            moveMergeBlocks(listtoconcat, (leftblock-rightblock), offY);
        }
        result = result.concat(listtoconcat);
    }
    console.log("Result, so far: ",result);
        await sleep(800);
    return result;
}

function moveMergeBlocks(list, amounttoshift, posy) {
    var size = 30;
//    console.log('Moving: ', list, amounttoshift);
    for (let block of list) {
        var thisblock = d3.select("#block_"+block);
        console.log('thisblock', thisblock);

        new_x = parseInt(thisblock.attr("x")) + amounttoshift;
        new_y = parseInt(thisblock.attr("y")) - posy;

//        console.log("Block x: ", thisblock.attr("x"), new_x);
        var x_text = 0;
        if (block > 9) {
           x_text = new_x + (size/2) - 5 - padding_left; }
        else {
           x_text = new_x + (size)/2 - padding_left; }

        thisblock.transition().duration(600)
            .attr("x", new_x)
            .attr("y", new_y);
        
        d3.select("#btext_"+block)
            .transition().duration(600)
            .attr("x", x_text)
            .attr("y", new_y+22);
    }
}

let merge_sort = async function(ms_list, size) {
//function merge_sort(ms_list, size) {
    console.log('Staring list : ', ms_list);
    if (ms_list.length <= 1) {
        d3.select("#block_"+ms_list[0]).transition().duration(400)
            .style("stroke", "green");
        return ms_list;
    }
    var middle = Math.floor(ms_list.length / 2);
    
    var left = ms_list.slice(0, middle);
    var right = ms_list.slice(middle);
    
    dx_left =  left.length*size + (size*left.length/2);
    dx_right = dx_left + right.length*size;
    
//    moveMergeBlocks(left, (posx-left.length*30-45), posy+40);
//    moveMergeBlocks(right, posx+45, posy+40);
    moveMergeBlocks(left, -dx_left, -40);
    moveMergeBlocks(right, dx_right, -40);

    await sleep(800);
//    dx -= 20;
//    middle = Math.floor(left.length / 2);
//    left = left.slice(0, middle);
//    console.log(left, dx);
//    moveMergeBlocks(left, -dx, posy+40);

        
    left = await merge_sort(left, size);
    right = await merge_sort(right, size);
//    await sleep(2600);
    return await merge(left, right)
}

function createMergeArray(worklist) {
    let newMergeArray=[];
    worklist.forEach((value, index, self) => {
        newMergeArray.push([index, value]);
    }) 
    console.log(newMergeArray);
    return newMergeArray;
}

function start_sort() {
    drawOriginalBlocks(worklist);
    console.log('Started with: ',worklist);
//    console.log('Produced: ', merge_sort(worklist));
    worklist = [5, 6, 3, 4, 8, 11];
    drawOriginalBlocks(worklist);
    var sort_title = document.getElementById("sort-method-title").innerHTML;
    switch (sort_title) {
        case "Bubble Sort":
        drawWorkBlocks(worklist);
            bubble_sort();
            break;
        case "Insertion Sort":
            drawWorkBlocks(worklist);
            insertion_sort();
            break;
        case "Merge Sort":
            x = 350 + worklist.length*30/2;
//            var newworklist = createMergeArray(worklist);
            drawMergeBlocks(worklist, x, 50);
            var size=15;
            worklist=merge_sort(worklist, size);
            break;
    }
    console.log('After', worklist);
}
