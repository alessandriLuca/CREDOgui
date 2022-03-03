<script>
    var interval
            var dir = '/home/dockerFileGenerator/';
        var sharedpath="/sharedFolder/";

$(document).ready(function()
{
    var queue=[];
    var working="well";
  
    function runexec(command,parameters,ecwd)
    {
       sendmessage("<span class='command'>Running "+command+" with parameters "+parameters+"</span>");
        $.ajax({
         async: true,
         type: 'GET',
         timeout: 0,
         url: '/runexec+'+command+"+"+parameters.join("SEP")+"+"+ecwd,
         success: function(data) {
              //sendmessage("Running ended with output: \n"+data);
         },
            error:function(xhr){
console.log("An error occured: " + xhr.status + " " + xhr.statusText);}
    });
    }
    
        function percentage()
    {
        $.ajax({
         async: true,
         type: 'GET',
         url: '/percentage',
         success: function(data) {
             if (data=="well" || data=="bad")
             {
                 working=data;
                 startroutine();
             }
             else
             {
                 if (data!="")
                    sendmessage(data);
             }
         },
            error:function(xhr){
console.log("An error occured: " + xhr.status + " " + xhr.statusText);}
    });
    }
    
/*  FOR NOW THIS FUNCTIONS ARE NOT USED
    function moveto(initial,end)
    {
        sendmessage("Start move from "+initial+" to "+end);
            $.ajax({
         async: true,
         type: 'GET',
         url: '/moveto+'+initial+'+'+end,
         success: function(data) {
              sendmessage("Move ended with output:\n "+data);
             startroutine();
         }
    });
    }

    function copyto(initial,end)
    {
        sendmessage("Start copy from "+initial+" to "+end);
            $.ajax({
         async: true,
         type: 'GET',
         url: '/copyto+'+initial+"+"+end,
         success: function(data) {
              sendmessage("Copy ended with output: \n"+data);
             startroutine();
             
         }
    });
    }

    function deletemergefile(path,foldername)
    {
           sendmessage("Deleting useless files");
            $.ajax({
         async: true,
         type: 'GET',
         url: '/deletemerge+'+path+"+"+foldername,
         success: function(data) {
              sendmessage("Deleted succesfully");
             startroutine();
         }
    });

    }
    
    
function deleteonefolder(foldername)
    {
        sendmessage("Deleting trash folders");
            $.ajax({
         async: true,
         type: 'GET',
         url: '/deleteone+'+foldername,
         success: function(data) {
              sendmessage("Deleted succesfully");
             startroutine();
         }
    });
    
    }


    function createfolder(path)
    {
            $.ajax({
         async: false,
         type: 'GET',
         url: '/createfolder+'+path,
         success: function(data) {
             sendmessage("Output folder created");
                     startroutine();
             
         }
    });
    }

    
*/
   

window.sendmessage=function(output)
    {
        let date_ob = new Date();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        entry="<span class='entry'><span class='time'>"+hours+":"+minutes+":"+seconds+"</span>: "+output+"</span>";
        
         $("#entrycontainer").append(entry);

    var objDiv = document.getElementById("console");
objDiv.scrollTop = objDiv.scrollHeight;

    }
    

    
    
function startroutine()
{
    if(queue.length!=0 && working=="well")
    {
        let toexec= queue.shift();
        actions=toexec.split("|");
        
        if(actions[0]=="runexec")
        {
            let obj=actions[2].split("£");
            runexec(actions[1],obj,actions[3]);
        } 
        /* FOR NOW THIS ACTION ARENOT USED 
        else if(actions[0]=="move")
        {
            moveto(actions[1],actions[2]);
        }
        else if(actions[0]=="copy")
        {
            copyto(actions[1],actions[2]);
        }
        else if(actions[0]=="delete")
        {
            deletemergefile(actions[1],actions[2]);
        }
        else if(actions[0]=="folder")
        {
             createfolder(actions[1]);
        }else if(actions[0]=="delone")
        {
            deleteonefolder(actions[1]);
        }
        */
    }
    else
    {
        var audio = new Audio('https://www.mboxdrive.com/Auditorium%20Applause-SoundBible.com-280911206.mp3');
                    clearInterval(interval);

        if (working=="well")
        {
            sendmessage("<span class='finish'>Docker creation is finished!</span>");
                    audio.play();


        }
            else
        {
            sendmessage("<span class='finish error'>Installation failure, check log.txt for more information.</span>");
        }
    }
}
    

    $('#dckstart').click(function(){
         let data="";
        let existantfolder= fnames.split("|");
        let existant=false;
        let empty=false;
        let name="";
        let mergebol=0;
        let tosave="";
        let oldcat="";

       $(':checkbox').each(function()
        {
           //Considering that the first level might be have more than one element, i declare it before to insert...
            if (this.checked==true)
            {
                id=this.id; 
                field=id[0]
                catid=id.split("sep")[0];

    // CONSIDERING THAT FOR JQUERY PROBLEM I HAD TO DELETE THE DOT, I RECONSTRUCT THE PATH USING BOTH ID AND VALUE OF AN INPUT   
                path=this.id.split("sep");
                path.pop();
                path.pop();
                path.push(this.value);
                stringpath=path.join("/");
                data="runexec|"+dir+stringpath+"/runMe.sh|";
                inputlist=inputstructure[catid].split("||");
                if(field==3)
                {
                    data=data+sharedpath+tosave+"_"+oldcat+"£";
                }
                if (field==2)
                {
                    oldcat=this.value;
                }
                inputlist.forEach(elements=> {                  
                        element=elements.split(":");
                    

                        if (element[0]=="firstpath" || element[0]=="secondpath")
                           $('[id^='+element[1].split("+")[1].replaceAll(" ","pes")+']').each(function(el){
                               if (mergebol<2)
                               {
                                   mergebol++;
                                   data+=sharedpath+this.value+"£";
                               }
});
                        else if(element[1].split("+")[1]=="find")
                        {
                            $('[id^='+element[1].split("+")[2].replaceAll(" ","pes")+']').each(function(el){
                               
                                   data+=sharedpath+this.value+"£";
                                    tosave=this.value;
                               
                        });
                        }
                        else
                        {
                            val= $("#"+element[0].replaceAll(" ","pes")+catid+"sep").val();
                            
                            if (element[0].includes("folder") || element[0].includes("Folder"))
                            {
                                if (existantfolder.includes(val))
                                {
                                    existant=true;
                                    name=val;
                                }
                            }
                            data=data+val+"£";
                            if (val=="")
                                empty=true;
                        }
                                     });
                        data=data.slice(0, -1);
                data=data+"|"+dir+"/"+stringpath+"/";
                queue.push(data);

                }
        }) ;
        
    const scrollHeight = document.body.scrollHeight;
    window.scrollTo(0, scrollHeight);
    
    if (queue.length==0)
        sendmessage("<span class='error'>Docker installation is NOT started. No items were checked.</span>");

   else if(empty==true)
    {
        sendmessage("<span class='error'>Docker installation is NOT started. You need to fill all the fields of the selected sections.</span>");
        empty=false;
        queue="";
    }
     else if(existant==true)
           {
        sendmessage("<span class='error'>Docker installation is NOT started. Foldername '"+name+"' already exist.</span>");
        existant=false;
               queue="";
    }  
        else
        {
           $('#dckstart').prop('disabled', true);
            sendmessage("Docker creation is starting");
             startroutine();
            interval=setInterval(percentage, 5000);     
        }

     });   
});

</script>