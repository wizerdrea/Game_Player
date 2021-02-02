set_message("You chose an option.");
set_options([
{
    requirements: [{
        flag: "test4",
        test: "contains",
        flag_value: "valid",
    }],
    message: "Made best choice",
    
    result_file: "end.js",
    updates: [],
},
{
    requirements: [{
        flag: "test4",
        test: "contains",
        flag_value: "not",
    }],
    message: "you shouldn't see this",
    
    result_file: "end.js",
    updates: [],
},
{
    requirements: [],
    message: "test A",
    
    result_file: "end.js",
    updates: [],
},
{
    requirements: [],
    message: "test B",
    
    result_file: "end.js",
    updates: [],
},
]);


