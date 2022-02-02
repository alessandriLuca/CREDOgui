<script>    
$(document).ready(function(){
    
function random()
    {
     let name=['abrahamlincoln','nelsonmandela','johnf.kennedy','martinlutherking','queenelizabethii','winstonchurchill','donaldtrump','billgates','muhammadali','mahatmagandhi','motherteresa','christophercolumbus','charlesdarwin','elvispresley','alberteinstein','paulmccartney','queenvictoria','popefrancis','jawaharlalnehru','leonardodavinci','vincentvangogh','franklind.roosevelt','popejohnpaulii','thomasedison','rosaparks','lyndonjohnson','ludwigbeethoven','oprahwinfrey','indiragandhi','evaperon','benazirbhutto','georgeorwell','desmondtutu','dalailama','waltdisney','neilarmstrong','petersellers','barackobama','malcolmx','j.k.rowling','richardbranson','pele','angelinajolie','jesseowens','johnlennon','henryford','haileselassie','josephstalin','lordbadenpowell','michaeljordon','vladimirlenin','ingridbergman','fidelcastro','leotolstoy','gretathunberg','pablopicasso','oscarwilde','cocochanel','charlesdegaulle','ameliaearhart','johnmkeynes','louispasteur','mikhailgorbachev','plato','adolfhitler','sting','elonmusk','marymagdalene','alfredhitchcock','michaeljackson','madonna','matahari','cleopatra','gracekelly','malalayousafzai','stevejobs','ronaldreagan','lionelmessi','baberuth','bobgeldof','rogerfederer','sigmundfreud','woodrowwilson','maozedong','katherinehepburn','audreyhepburn','davidbeckham','tigerwoods','usainbolt','carllewis','princecharles','jacquelinekennedyonassis','joebiden','kimkardashian','c.s.lewis','billieholiday','j.r.r.tolkien','billiejeanking','margaretthatcher','morefamouspeople','annefrank','simonbolivar','marieantoinette','cristianoronaldo','emmelinepankhurst','emilezatopek','lechwalesa','julieandrews','florencenightingale','mariecurie','stephenhawking','timbernerslee','aungsansuukyi','lancearmstrong','shakira','jonstewart','wrightbrothersorville','ernesthemingway','romanabramovich','tomcruise','rupertmurdoch','algore','sachabaroncohen','georgeclooney','paulkrugman','jimmywales','bradpitt','kylieminogue','stephenking'];
        let adj=['abrupt','acidic','adorable','adventurous','aggressive','agitated','alert','aloof','amiable','amused','annoyed','antsy','anxious','appalling','appetizing','apprehensive','arrogant','ashamed','astonishing','attractive','average','batty','beefy','bewildered','biting','bitter','bland','blushing','bored','brave','bright','broad','bulky','burly','charming','cheeky','cheerful','chubby','clean','clear','cloudy','clueless','clumsy','colorful','colossal','combative','comfortable','condemned','condescending','confused','contemplative','convincing','convoluted','cooperative','corny','costly','courageous','crabby','creepy','crooked','cruel','cumbersome','curved','cynical','dangerous','dashing','decayed','deceitful','deep','defeated','defiant','delicious','delightful','depraved','depressed','despicable','determined','dilapidated','diminutive','disgusted','distinct','distraught','distressed','disturbed','dizzy','drab','drained','dull','eager','ecstatic','elated','elegant','emaciated','embarrassed','enchanting','encouraging','energetic','enormous','enthusiastic','envious','exasperated','excited','exhilarated','extensive','exuberant','fancy','fantastic','fierce','filthy','flat','floppy','fluttering','foolish','frantic','fresh','friendly','frightened','frothy','frustrating','funny','fuzzy','gaudy','gentle','ghastly','giddy','gigantic','glamorous','gleaming','glorious','gorgeous','graceful','greasy','grieving','gritty','grotesque','grubby','grumpy','handsome','happy','harebrained','healthy','helpful','helpless','high','hollow','homely','horrific','huge','hungry','hurt','icy','ideal','immense','impressionable','intrigued','irate','irritable','itchy','jealous','jittery','jolly','joyous','filthy','flat','floppy','fluttering','foolish','frantic','fresh','friendly','frightened','frothy','frustrating','funny','fuzzy','gaudy','gentle','ghastly','giddy','gigantic','glamorous','gleaming','glorious','gorgeous','graceful','greasy','grieving','gritty','grotesque','grubby','grumpy','handsome','happy','harebrained','healthy','helpful','helpless','high','hollow','homely','horrific','huge','hungry','hurt','icy','ideal','immense','impressionable','intrigued','irate','irritable','itchy','jealous','jittery','jolly','joyous','juicy','jumpy','kind','lackadaisical','large','lazy','lethal','little','lively','livid','lonely','loose','lovely','lucky','ludicrous','macho','magnificent','mammoth','maniacal','massive','melancholy','melted','miniature','minute','mistaken','misty','moody','mortified','motionless','muddy','mysterious','narrow','nasty','naughty','nervous','nonchalant','nonsensical','nutritious','nutty','obedient','oblivious','obnoxious','odd','old-fashioned','outrageous','panicky','perfect','perplexed','petite','petty','plain','pleasant','poised','pompous','precious','prickly','proud','pungent','puny','quaint','quizzical','ratty','reassured','relieved','repulsive','responsive','ripe','robust','rotten','rotund','rough','round','salty','sarcastic','scant','scary','scattered','scrawny','selfish','shaggy','shaky','shallow','sharp','shiny','short','silky','silly','skinny','slimy','slippery','small','smarmy','smiling','smoggy','smooth','smug','soggy','solid','sore','sour','sparkling','spicy','splendid','spotless','square','stale','steady','steep','responsive','sticky','stormy','stout','straight','strange','strong','stunning','substantial','successful','succulent','superficial','superior','swanky','sweet','tart','tasty','teeny','tender','tense','terrible','testy','thankful','thick','thoughtful','thoughtless','tight','timely','tricky','trite','troubled','twitte','uneven','unsightly','upset','uptight','vast','vexed','victorious','virtuous','vivacious','vivid','wacky','weary','whimsical','whopping','wicked','witty','wobbly','wonderful','worried','yummy','zany','zealous','zippy'];
        
        const random1 = Math.floor(Math.random() * name.length);
        const random2 = Math.floor(Math.random() * adj.length);

        return name[random1]+adj[random2]
    } 
    
// !!!!!!!!!!!!!!!!!!!!!!!! CONFIGURATION !!!!!!!!!!!!!!!!!!!!!!!!!
    
    
 $(document).on ("click", "#send", function () {
    $.post('/configsend',{inform:this.value+"XXX"+$("#textcontent").val()});
});   
    
 $(document).on ("click", "#close", function () {
$("#textcontainer").remove();
});  
    
 $(document).on ("click", ".config", function () {
    url=this.value;
     $("#textcontainer").remove();
     $.get( "/config+"+url, function(data) 
      {  
            $(data).insertAfter("header");
      });
});    


    /// !!!!!!!!!!!!!!!!!!!!!!!! WEB LAYOUT CREATION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
const regex=/^[0-9]{1,2}_.*/; //regex that verify if the name start with a number
let id;
paths=structure.split("#");
paths.pop(); // delete the last occurrency ( NULL VALUE)
paths.forEach(path=>
          {
                splittedpath=path.split("/");
                splittedpath.shift(); // delete the first occurrency ( NULL VALUE) 
                currentpath="";
                for (let i=0;i<splittedpath.length;i=i+1)
                {   
                    oldpath=currentpath;
                    currentpath=currentpath+splittedpath[i]+"sep";
                    if ( !$("#"+currentpath).length ) {
                        id=currentpath.replaceAll(".","");
                        if(splittedpath[i].match(regex))
                        {    
                            if(splittedpath[i][0]==0)
                            {
                                htmlform="<span class='textform'> <span class='field'> Result Folder Name <input type='text' id='folder"+id+"''></span><span class='field'>Temp Docker <input type='text' id='docker"+id+"' value='"+random()+"'></span></span> ";
                                $("#plan").append("<span class='subcontainer' id="+id+"><span class='title'>"+splittedpath[i]+"</span>"+htmlform+"</span>");
                            }
                            else if(splittedpath[i][0]==1)
                            {
                                  htmlform="<span class='textform'> <span class='field'> Result Folder Name <input type='text' id='folder"+id+"'></span></span> ";
                                $("#root").append("<span class='container'><span class='subcontainer' id="+id+"><span class='title'>"+splittedpath[i]+"</span>"+htmlform+"</span></span>");
                            }
                            else if(splittedpath[i][0]==2)
                            {
                                  htmlform="<span class='textform'><span class='field'> Temp Dockername <input type='text' id='tmpdocker"+id+"'value='"+random()+"'></span> <span class='field'>Dockername <input type='text' id='docker"+id+"' ></span></span> ";

                                $("#root").append("<span class='container'><span class='subcontainer' id="+id+"><span class='title'>"+splittedpath[i]+"</span>"+htmlform+"</span></span>");
                            }
                            else {
                                $("#root").append("<span class='container'><span class='subcontainer' id="+id+"><span class='title'>"+splittedpath[i]+"</span></span></span>");

                            }
                        }
                        else if((i+1)==splittedpath.length)
                        {
                            $("#"+oldpath).append("<span class='options'><input class='checkboxinput' onchange='checkboxcheck()' type='checkbox' id="+id+" value='"+splittedpath[i]+"'><span class='optext'>"+splittedpath[i]+"</span></span>");
                        }
                        else
                        {
                            $("#"+oldpath).append("<span class='subcontainer' id="+id+"><span class='title'>"+splittedpath[i]+"</span></span>");
                        }

                    }
                    
                }
    


});
    // FIRST START RULE LOADING
        $(":checkbox").each(function() 
    {
        id=this.id;
        // by default the level >0 are disabled because they need selection of an upper layer
        if(id[0]>0)
        {
           this.disabled=true;      
        }
    });



});


</script>