//sa·cré bleu
// ps. thank you Prashant!
// global --- window.onload was not working - console did not recognize $ for some reason fkhlasjdhlsakjzdhflkasjdhflskajdfh
$(document).ready(function (){
    var show = $('#show'),
        search_term = $('#search_term'),
        showList = $('#showList');
    
    var requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows'
    }
    //page load
    $.ajax(requestConfig).then(function (responseMessage) {
        //for each show - create list items of link--link text is the name of the show
        //if theres a list of shows already, best to hide the home link until it clicks on a show
       // showList.hide();
        showList.empty();
        show.hide();
        $('#homeLink').hide();
        for (let i = 0; i < responseMessage.length; i++) {
            showList.append(`<li><a class="showElement" href='${responseMessage[i]._links.self.href}'>${responseMessage[i].name}</a></li>`)
            showList.show();
        }

        // if link is clicked -- call the link function
        $('a').on("click", function(event) {
            event.preventDefault();
            showList.hide();
            //append each list item to showList -- ajax request
            nowLinkedIsClicked(event.target);
        });

        // $('#homeLink').on("click", function(event){
        //     event.preventDefault()
        //     console.log("help");
        //     showList.show();
        // });
        //console.log("showList")
        //showList.show(); 
    });
  

    
    // search form submission
    $('#searchForm').submit(function(event){
        event.preventDefault();
        if (!search_term.val() || search_term.val().trim().length === 0) {
            // alert("ERROR: INVALID SEARCH TERM")
            $('#error p').error(function(){
                alert("ERROR: INVALID SEARCH TERM");
            })
        } else{ //if there is a value
            requestConfig = {
                method:"GET",
                url: `http://api.tvmaze.com/search/shows?q=${search_term.val()}`, 
            }
            $.ajax(requestConfig).then(function(responseMessage){
                showList.empty();//dont show the list
                show.hide();
                $('#homeLink').hide();
                for (let i = 0; i < responseMessage.length; i++) {
                    showList.append(`<li><a class="showElement" href='${responseMessage[i].show._links.self.href}'>${responseMessage[i].show.name}</a></li>`)
                    showList.show();
                }
             // if link is clicked -- call the link function
             $('.showElement').on("click", function(event) {
                event.preventDefault();
                showList.hide();
                //append each list item to showList -- ajax request
                nowLinkedIsClicked(event.target);
                show.show();
            });
            $("input[type=text").each(function(){ // clear the text after searching
                search_term.val('');
            })
        
        })
        
        }
    }) 


    //Linked Clicked
    function nowLinkedIsClicked(link){
        $.ajax({
            method: "GET",
            url: link
        }).then(function(responseMessage) {
            // console.log(responseMessage)
        //parse thru
        //if there is an image icon but image does not exist -- no image available
        if (!responseMessage.name || responseMessage.name.trim().length === 0){
            responseMessage.name = "N/A";
        }

        if (responseMessage.image=== null && !responseMessage.image){
            responseMessage.image = { medium:""}
            responseMessage.image.medium = "../public/no_image.jpeg";
        }

        if (!responseMessage.language){
            responseMessage.language = "N/A"; 
        }

        if (!Array.isArray(responseMessage.genres) || responseMessage.genres.length === 0) {
            responseMessage.genres = ["N/A"];
        }

        if (responseMessage.rating) {
            if (!responseMessage.rating.average){
                responseMessage.rating.average = "N/A";
            }
        }

        if (responseMessage.network) {
            if (!responseMessage.network.name || responseMessage.network.name.trim().length === 0) {
                responseMessage.network.name = "N/A";
            }
        }

        if (!responseMessage.summary || responseMessage.summary.trim().length === 0) {
            responseMessage.summary = "N/A";
        }
        //console.log(responseMessage.image)
        show.empty();
        $('#homeLink').show();
        show.append(`<h1>${responseMessage.name}</h1>`+ 
                    `<img src="${responseMessage.image && responseMessage.image.medium ? responseMessage.image.medium : "/public/no_image.jpeg"}"/>`+
                    `<dl>
                        <dt>Language</dt>
                            <dd>${responseMessage.language}</dd>
                        <dt>Genres</dt>
                            <dd><ul>${responseMessage.genres}</ul></dd>
                        <dt>Rating Average</dt>
                            <dd>${responseMessage.rating.average}</dd>
                        <dt>Network Name</dt>
                            <dd>${responseMessage.network && responseMessage.network.name ? responseMessage.network.name : "N/A"}</dd>
                        <dt>Summary<dt>
                            <dd>${responseMessage.summary}</dd>
                    </dl>`);
        });
        show.show();
        $('#homeLink').show();
        $('#homeLink').on("click", function(event){
            show.hide();
            showList.show();
        });
    }
           
});
