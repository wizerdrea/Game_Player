set_message("This is a crazy fun test game.  What more could it possibly need? :)");
set_options([
{
    message: "you should see this",
    requirements: [{
        flag: "test",
        test: "equal",
        flag_value: true,
    }],
    
    result_file: "0001.js",
    updates: [{
        flag: "test3",
        action: "add",
        new_value: 2,
    },
   {
       flag: "test",
       action: "set",
       new_value: false,
   }],
},
{
    message: "you shouldn't see this",
    requirements: [{
        flag: "test",
        test: "equal",
        flag_value: false,
    }],
    
    result_file: "error.js",
    updates: [],
},
{
    requirements: [],
    message: "Hi {{name}}, this is the best option",
    
    result_file: "0002.js",
    updates: [{
        flag: "test4",
        action: "append",
        new_value: "valid",
    },
    {
       flag: "test4",
       action: "append",
       new_value: "other",
    }],
},
{
    requirements: [],
    message: "The worst option",
    
    result_file: "0002.js",
    updates: [],
}
]);


