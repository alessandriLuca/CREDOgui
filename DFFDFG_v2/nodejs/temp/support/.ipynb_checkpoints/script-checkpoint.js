<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>
<script>
function checkboxcheck()
{
    // SET initial checkbox values
    let startcheckbox={};
    let levelnumber=[];
    let todisablelist=[];
    let id;

    $(":checkbox").each(function() 
    {
        id=this.id;
        // by default the level >0 are disabled because they need selection of an upper layer
        if(id[0]>0)
           this.disabled=true;      
        else
            this.disabled=false;
    });
    $(".config").remove();
    
    // let's find the restrictions and the exceptions to apply later
    $(':checkbox').each(function()
    {
        if (this.checked==true)
        {
            // LOAD exceptions related to this item if they are present
            if (this.id in exceptionstruct)
            {   
                except=exceptionstruct[this.id].split("$");
                except.forEach(elem=> { if (document.getElementById(elem)){todisablelist.push(elem)} else{alert("Exceptions doesn't exist");}});
            }  
            // LOAD exceptions to guarantee the integrity of 
            id=this.id; 
            field=id[0];
            if(field in levelnumber)
              levelnumber[field]=levelnumber[field]+1;
            else
                levelnumber[field]=1;
            if (field==0)
            {
            //Reconstruct the correct path (ADD THE .) !!!!!!!!!!! CONSIDER MAKE IT A FUNCitoNS
                confpath=this.id.split("sep");
                confpath.pop();
                confpath.pop();
                confpath.push(this.value);
                strconf=confpath.join("/");

                $("#"+id.split("sep")[0]+"sep :checkbox").each(function(){ if (this.id!=id){todisablelist.push(this.id);} });  
                $("#"+id.split("sep")[0]+"sep").children(".title").append("<button type='button' id='config' class='config' value='"+strconf+"'>Config</button>"); 
            } 
            else
              $("[id^=" + field + "]").each(function(){if  (this.id!=id){todisablelist.push(this.id);}});
            
        }
    });

    for( let key in levelnumber)
    {
        // Exception for the level 1 that needs two selection on level 0
        if (key==0)
        {
            if (levelnumber[key]>1)
                $(":checkbox").each(function(){if(this.id[0]==1){this.disabled=false;}});
            
        }
        else
        {
          if( levelnumber[key]==1)
          {
             convkey= parseInt(key)+1;
             $(":checkbox").each(function(){if(this.id[0]==(convkey)){this.disabled=false;}});    
          }
        }
    }
    
    //APPLY RESTRICTIONS AND EXCEPTIONS
    
    for (let element in todisablelist)
    {
            let a="#"+todisablelist[element];
        $(a).each(function(){this.disabled=true;});
    }
    
}

// !!!!!!!!!!!!!!!!!!!!!!!!!! VIDEO TUTORIAL !!!!!!!!!!!!!!!!!!!!!!

$(document).ready(function(){
   
function tutorialshow()
    {
      $('body').append('<span class="sticky"><button type="button" id="videoclose">Close Video</button><iframe width="560" height="315" src="https://www.youtube.com/embed/qEc3dGK6il0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></sticky>');
    
    }   
function closetutorial()
    {
        $('.sticky').remove();
    }
$('#tutorial').click(tutorialshow);

 $(document).on ("click", "#videoclose", closetutorial);      
    
    
$('#videoclose').click(closetutorial);
    
});



// !!!!!!!!!!!!!!!!!!!!!!!! GITPULL !!!!!!!!!!!!!!!!!!!!!!!!!    

$(document).ready(function(){
   
function update()
    {
      sendmessage("Searching for update..");
      $.ajax({
         async: true,
         type: 'GET',
         url: '/update',
         success: function(data) 
              {
             if (data=="no")
                 sendmessage("Structure is already updated");
             else
                sendmessage("Structure has been updated, reload page");
              }
        });
    
    }   
    
$('#gitpull').click(update);
});

//!!!!!!!!!!!!!!!!!!!!!! REMOVE DOCKER FILE !!!!!!!!!!!!!!!!!!!!!!

$(document).ready(function(){
   
function rmvdocker()
    {
      sendmessage("Removing docker files..");
      $.ajax({
         async: true,
         type: 'GET',
         url: '/rmdocker',
         success: function(data) 
              {
             sendmessage(data)
              }
        });
    
    }   
    
$('#rmdocker').click(rmvdocker);
});


</script>