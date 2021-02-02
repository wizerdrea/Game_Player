# Game_Player
A simple software that allows for the creation and playing "choose your own adventure" style games.  

***** Using the software *****

To use the software simply open 'index.html' in your favorite web browser.  (I have only tested it's functionality in Safari and Chrome so I don't know how well it works in others).  When you open the software it should show you a list off all games you have in your libray.  Select the one you would like to play.  And have fun!

IMPORTANT!!!  Do not refresh the browswer page while playing a game, you will loose all unsaved data and return to the main menu.

-Saving a Game-
To save a game click on the menu button.  This will open the options menu.  If you arae playing a game the first option is to save your game.  Type a name for your save and click save.  This will download a file name save_yourSaveName.js to the default download folder of your computer.  You will now need to move this save to the save folder of the game.  (For security reasons the web browser cannot save a file directly to the save folder).  The save folder is located at Game_Player/game_library/yourGamesName/saves copy the file to this folder without changing its name.  If you already have a save by the same name in this folder you will have to overwrite it to play your new save (our you can resave you game with a different name).

IMPORTANT!!!  Never name a save "start" or edit the save_start.js file in your game.  This is what the game uses to configure a new game and editing it, will corrupt all future saves you make.  Leave the file alone.

-Loading a Save-
To load a save select the game you wish to play then type the name of the save into the provided textbox and click load.  the save file will have a name of the form save_yourSaveName.js  I should only type yourSaveName.  Leave off the preceding "save_" and the ".js" at the end or the software will get confused and not load your save.  Also please note that the game will only load save located in the correct save folder.  Please following the instructions above to place you save in the correct folder to prevent issues.

//to add instructions on downloading and deleteing more games.

***** Designing a basic game to be played in the software *****

To design a basic game (one with only text and choices) you will be editing the file start_save.js, adding image file (png and jgp) to the correct img folder and writing file scene files.  

To start go copy the folder game_template from the folder templates to the folder game_library.  change the name of the copied folder from "game_template" to the name of your game.  Next open the file game_list.js (located in the game_library folder) in a text editor.  The contents of the file will look something like this:

set_game_list(["test",]);

Add the name you game to this file in " followed by a comma to this file without editing anything else.  when you are done the file should look something like this:

set_game_list(["test","yourGamesName",]);

(If you want you game to appear first, simple add it to the begining of the list).  Save your changes and close the file.

The game_player software now knows your game exists and will display is an option.  (please note it is important that the name you put in this file exactly matches [including case] the name you gave your game's folder).

Now it is time to design your game.  Most of the work in designing the game revolvs around writing scene files.  In order to build a more complex game (one that can track players choices and change what options are given to them based on those choices) it is important to understand the concept of "flags".

-Flags-
Flags are used to track players choices throught the game.  The options a player is presented with in a scene can be altered based on the current flags.  In short this means that if two players have gotten to the same scene via differnt choices you can give them diffent options.

Flags are "name value pairs".  What this means is that a flag consists of a unique name (two flags cannot share a game) and some type of value.  New flags can be created as the game goes on, and flag values can be updated.  Flag names however cannot be changed.

Flags can have several different types of values.  They types are numbers, boolian (a boolian is either true or false), a string (a string is a word or collection of words enclosed in ""), or an array of string (an array is a list of item).

Here are examples of some flags.  I have written them here in the same way they are written a save file which is flagName "colon" flagValue "comma" 

    number_flag: 5,
    another_number_flag: -3,
    boolian_flag: true,
    string_flag: "some words",
    array_flag: ["word", "another word", "more words",],
    
Before displaying an option you can check one or more flags and only display it if certain flags meet certain requirements.  A flag can be checked in varius ways.  The ways a flag can be checked are as follows: 

    greater:  checks if the flag's value is greater than a certain value
    less:     checks if the flag's value is less than a certain value
    equal:    checks if the flag's value is equal to a certain value
    contains: checks if an array flag contains a certain value
    
Note: If you try to check a flag that doesn't exist it will fail the check reguardless of what check you use.

You can also set it so that when a choice is made it updates one or more flags.  The ways a flag can be updated are as follows: 

    add:        adds a value to a number flag (if the flag doesnt exist it will create it the value)
    subtract:   subtract a value from a number flag (if the flag doesn't exist it will create it and set it to minus the vlaue)
    set:        sets a flag to a value (creating the flag if it doesn't exist)
    append:     adds a new value to an array flag (creating the flag if it doesn't exist)
    
A final not on flags: don't but an spaces in flag names use _ in place of spaces.

-Writing a scene-
Writting a scene consists of a thee main pieces, loading a new image (optional), writing a message for the player to read, writting option for the user to select along with the consequenses of those choices.

The fist step in writing a scene is to create a scene file.  The file must have the .js extention and be locatied in the the file scenes which is in Game_Player/game_library/yourGame/game_files  

*loding an image
If you wish to load a new image, first place the desired image in the images folder which is in Game_Player/game_library/yourGame/game_files  Next place the following line of code in your scene file:

    set_scene_img("yourImageName");

*writting a message
To update the mesage the player sees, write your message in the following format:

    set_message("Your message goes here in these quotes.  The viewer will see this.");

If you want the player's character name to be shows place {{name}} in the massage.  For example this line:

    set_message("Oh hi, {{name}}, how is life going?");

Will show the folling message (assuming the character's name is John Doe):

    Oh hi, John Doe, how is life going?

The text will naturaly wrap around but if you want to force a new line place <br> where you want the break.  For example the this line:

    set_message("first line<br>second line);

Will produce this message:

    first line
    second line

Messages can be very long.  There is no need or requirment for them to be short.

*writing options
Writing the options is perhaps the trickies part of writing a scene as it has the most confusing format.  The options will look something like:

    set_options([
    {
        message: "Option A message",
        requirements: [],
        
        result_file: "next_scene.js",
        updates: [],
    },
    {
        message: "Option B message",
        requirements: [
            {
                flag: "first_flag",
                test: "equal",
                flag_value: true,
            },
            {
                flag: "second_flag",
                test: "greater",
                flag_value: 3,
            },],
        
        result_file: "another_scene.js",
        updates: [],
    },
    {
        message: "Option C message",
        requirements: [],
        
        result_file: "next_scene.js",
        updates: [
            {
                flag: "second_flag",
                action: "set",
                new_value: false,
            },
           {
               flag: "third_flag",
               action: "add",
               new_value: 2,
           },],
    },
    {
        message: "Option D message",
        requirements: [
            {
                flag: "forth_flag",
                test: "equal",
                flag_value: "a word",
            },
            {
                flag: "second_flag",
                test: "less",
                flag_value: 3,
            },],
        
        result_file: "another_scene.js",
        updates: [
            {
                flag: "third_flag",
                action: "subtract",
                new_value: 1,
            },],
    },
    ]);


I know this looks a little confusing and it is.  But let's see if we can break it down.  The scene shown here gives 4 option.  I will refer to them as options A, B, C, D.  Option A is a simple (shown below) is the simplest option.  Notice it is made of four things: a message, requirements, a result file name, and update.  All options consist of these same four things.  message is a simple message that will be displayed to the user to discribe this option.  requirements are the flags that must be checked before displaying this message.  result_file is the file that contains the next scene that should be played if this choice is made, and updates is a list of flags that should be updated if this choice is made.

Option A is a very simple option.  It has no requirements and makes no updates.  It simple displays a simple message and if it is selected it plays tge scene contained in the file next_scene.js.  It is important to note that even though requirments and updates may not do anything as in option A it is still important to have them like option A demonstrates to keep the software running correctly

    {
        message: "Option A message",
        requirements: [],
        
        result_file: "next_scene.js",
        updates: [],
    },

Option B is a little more complex.  It still contains no updates but it does have two requirements in order to be visable to the player.

    {
        message: "Option B message",
        requirements: [
            {
                flag: "first_flag",
                test: "equal",
                flag_value: true,
            },
            {
                flag: "second_flag",
                test: "greater",
                flag_value: 3,
            },],
        
        result_file: "another_scene.js",
        updates: [],
    },
    
The first requirement is:

    {
        flag: "first_flag",
        test: "equal",
        flag_value: true,
    },
    
This requirement means the the flag named "first_flag" must exist and have the boolian value true in order for this option to be shown.  The second requirement is:

    {
        flag: "second_flag",
        test: "greater",
        flag_value: 3,
    },

This requirement says that the flag named "second_flag" must have a value greater that 3 in order for this option to be visable.  

If either of these two requirments is not met, option B will not be shown.

Option C has no requirements but does update two flags if it is selected.

    {
        message: "Option C message",
        requirements: [],
        
        result_file: "next_scene.js",
        updates: [
            {
                flag: "second_flag",
                action: "set",
                new_value: false,
            },
           {
               flag: "third_flag",
               action: "add",
               new_value: 2,
           },],
    },

The first update is:

    {
        flag: "second_flag",
        action: "set",
        new_value: false,
    },

This updating is saying to take the flag names "second_flag" and set its value to the boolian value false.

the second update:

    {
        flag: "third_flag",
        action: "add",
        new_value: 2,
    },

Says to add 2 the the value of the flag named "third_flag".  Remember that if neither of these flags exist they will be created and set to the given value.

The final option option D has 2 requirements ot be shown and performs one update if it is selectd.

Correct bracket and comma placement in the options in very important.  Without it the game will likely not function.  But don't stress too much.  Just model your options after the given examples.

An option can have any number requirements and updates, and a scene can have any number of options even zero (this would be useful for an end of game scene).  To have zero options simply use the following line:

    set_options([]);

-Editing the save_start file-

The final piece of writing a game is to set up the start_save.js file.  This is the file that is used to configure a new game.  

The save_start.js file constist of three things: the starting scene, the flags you want set at the begining of the game, and a command to start the game.  To set the starting scene use the following line replacing firstSceneFileName with the name of the file for the scene you wish to play at the begining or a new game.

    set_current_file("firstSceneFileName");
    
The set the starting flags use (replacing the flag names and values as desired):

    set_flags({
        yourFlagsName: true,
        thisIsAnArrayFlag: ["firstItem", "secondItem", "anotherItem",],
    });
    
You can set any number of flags at the start of a game.  If you wish to set zero flags simple use:

    set_flags({});
    
The final line of a save_start.js file must always be:

    play_scene();
    
Don't worry too much about this just make sure it is there.

Below is the example of a save_start.js

    set_current_file("begining.js");

    set_flags({
        flag_1: true,
        flag_2: "test",
    });

    play_scene();

This save_start sets the starting scene to the file begining.js and creates the flag_1 with the boolian value true and the flag flag_2 who's value is the string "test".

Good luck!  That should be all of the basics you need to start creating simple games!
