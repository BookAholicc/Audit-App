$('#options').click(function(){
    $('#admin-user').toggle();
});

$('#orgs').click(function(){
    var list = $('#list-items');
    list.toggle();
    $('.welcome').toggle();
    var isVisible = list.is(':visible');
    
    if (isVisible) {
        //add the getorganizations list calling function here
    }
});

$('#submitOrgName').click(function(e){
    var input = $('#orgname').val();
    console.log(input);
    
    //call createOrganization method
});