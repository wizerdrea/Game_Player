set_message("This is a crazy fun test game.  What more could it possibly need? :)");
set_options([
{
    message: "you shouldn't see this",
    requirements: [{
        flag: "test",
        test: "equal",
        flag_value: true,
    }],
    
    result_file: "error.js",
    updates: [],
},
{
    message: "you should see this",
    requirements: [{
        flag: "test",
        test: "equal",
        flag_value: false,
    }],
    
    result_file: "0001.js",
    updates: [],
},
{
    requirements: [{
        flag: "test",
        test: "equal",
        flag_value: false,
    },
   {
       flag: "test3",
       test: "greater",
       flag_value: 1,
   },],
    message: "you should see this too",
    
    result_file: "0001.js",
    updates: [],
},
{
    requirements: [{
        flag: "test",
        test: "equal",
        flag_value: false,
    },
    {
        flag: "test3",
        test: "less",
        flag_value: 3,
         
    },],
    message: "you should also see this",
    
    result_file: "0001.js",
    updates: [],
},
{
    requirements: [{
        flag: "test3",
        test: "less",
        flag_value: 2,
    }],
    message: "you shouldn't see this too",
    
    result_file: "error.js",
    updates: [],
},
{
    requirements: [{
        flag: "test3",
        test: "greater",
        flag_value: 2,
    }],
    message: "you also shouldn't see this",
    
    result_file: "error.js",
    updates: [],
},
]);


