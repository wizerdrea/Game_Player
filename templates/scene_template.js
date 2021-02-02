set_message("Message to show to players");
set_options([
{
    message: "This options message",
    requirements: [{
        flag: "test",
        test: "equal",
        flag_value: true,
    },],
        
    result_file: "next_file_if_this_option_is_selected.js",
    updates: [
    {
        flag: "test3",
        action: "add",
        new_value: 2,
    },
   {
       flag: "test",
       action: "set",
       new_value: false,
   },],
},
{
    message: "This options message",
    requirements: [],
    
    
    result_file: "0002.js",
    updates: [],
},
]);


