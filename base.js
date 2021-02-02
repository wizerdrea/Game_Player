let game_list = null;

const data_files_path = "/game_files/text/";
let current_game = "game_library/";
let save_name = null;

let current_img;
let current_file;
let char_name;
let flags;

let message;
let options;

const init_game = () => {
    set_current_img("res/title_image.png");
    document.getElementById("menu_button").addEventListener("click", (event) => {
        open_menu();
    });
    save_name = null;
    current_game = "game_library/";
    if (game_list != null)
        display_game_list();
};

const loadData = (path, type) => {
    let s = document.createElement("script");
    s.src = path;
    s.innerHTML = null;
    document.getElementById(type).innerHTML = "";
    document.getElementById(type).appendChild(s);
};

const load_game = () => {
    load_game_css();
    load_game_functions();
    set_message("Start a new game or load a save");
    document.getElementById("options").innerHTML = "";
    
    let item = document.createElement("li");
    item.innerHTML = "Start New Game";
    
    let button = document.createElement("button");
    button.classList.add("menu_button");
    button.innerHTML = "select";
    button.addEventListener("click", (event) => {
        start_new_game();
    });
    
    item.appendChild(button);
    document.getElementById("options").appendChild(item);
    
    item = document.createElement("li");
    item.innerHTML = "Enter Name of a Save to load it";
    
    let text_field = document.createElement("input");
    text_field.classList.add("text_input");
    text_field.setAttribute("type", "text");
    text_field.id = "save_name";
    item.appendChild(text_field);
    
    button = document.createElement("button");
    button.classList.add("menu_button");
    button.innerHTML = "load";
    button.addEventListener("click", (event) => {
        load_save(document.getElementById("save_name").value);
    });
    
    item.appendChild(button);
    document.getElementById("options").appendChild(item);
};

const open_menu = () => {
    set_message("Game Player Menu");
    document.getElementById("options").innerHTML = "";
    if (save_name != null)
    {
        let item = document.createElement("li");
        item.innerHTML = "Save Game";
        
        let text_field = document.createElement("input");
        text_field.classList.add("text_input");
        text_field.setAttribute("type", "text");
        text_field.id = "save_name";
        item.appendChild(text_field);
        text_field = "please enter a name for your save";
        
        let button = document.createElement("button");
        button.classList.add("menu_button");
        button.innerHTML = "select";
        button.addEventListener("click", (event) => {
            save_name = document.getElementById("save_name").value;
            save_game();
        });
        item.appendChild(button);
        document.getElementById("options").appendChild(item);
    }
    
    let item = document.createElement("li");
    item.innerHTML = "Return to Main Game Library (warning all unsaved data will be lost)";
    let button = document.createElement("button");
    button.classList.add("menu_button");
    button.innerHTML = "select";
    button.addEventListener("click", (event) => {
        init_game();
    });
    item.appendChild(button);
    document.getElementById("options").appendChild(item);
    
    item = document.createElement("li");
    item.innerHTML = "Exit Menu";
    button = document.createElement("button");
    button.classList.add("menu_button");
    button.innerHTML = "select";
    button.addEventListener("click", (event) => {
        exit_menu();
    });
    item.appendChild(button);
    document.getElementById("options").appendChild(item);
    
};

const save_game = () => {
    download_save();
};

const exit_menu = () => {
    if (current_game === "game_library/")
        init_game();
    else if (save_name === null)
        load_game(current_game.substr(13));
    else
        play_scene();
};

const add_game = (game) => {
    let s = document.createElement("li");
    s.innerHTML = game;
    let r = document.createElement("button");
    r.classList.add("play_button");
    r.innerHTML = "play!";
    r.addEventListener("click", (event) => {
        current_game += game;
        load_game();
    });
    s.appendChild(r);
    document.getElementById("options").appendChild(s);
};

const set_game_list = (list) => {
    game_list = list;
    display_game_list();
};

const display_game_list = () => {
    set_message("Select a game to play");
    document.getElementById("options").innerHTML = "";
    game_list.forEach(game => add_game(game));
};

const play_scene = () => {
    console.log(current_game + current_file);
    loadData(current_game + data_files_path + current_file, "data");
}

const set_char_name = (name) => {
    char_name = name;
};

const set_current_file = (file_name) => {
    current_file = file_name;
};

const set_flags = (data) => {
    flags = data;
};

const add_option = (option) => {
    for (let i = 0; i < option.requirements.length; i++) {
        if (!check_requirement(option.requirements[i]))
            return;
    }
    let s = document.createElement("li");
    s.innerHTML = insert_char_name(option.message);
    let r = document.createElement("button");
    r.classList.add("choice_button");
    r.innerHTML = "choose";
    r.addEventListener("click", (event) => {
        apply_results(option);
    });
    s.appendChild(r);
    document.getElementById("options").appendChild(s);
};

const check_requirement = (requirement) => {
    if (requirement.test === "equal") {
        return (flags[requirement.flag] === requirement.flag_value);
    }
    else if (requirement.test === "greater") {
        return (flags[requirement.flag] > requirement.flag_value);
    }
    else if (requirement.test === "less") {
        return (flags[requirement.flag] < requirement.flag_value);
    }
    else if (requirement.test === "contains") {
        if (flags[requirement.flag] === undefined)
            return false;
        return (flags[requirement.flag].includes(requirement.flag_value));
    }
    else {
        return false;
    }
};

apply_results = (choice) => {
    choice.updates.forEach(update => apply_flag_update(update));
    
    set_current_file(choice.result_file);
    play_scene();
};

const apply_flag_update = (update) => {
    if (update.action === "add") {
        if (flags[update.flag] === undefined)
            flags[update.flag] = update.new_value;
        else
            flags[update.flag] += update.new_value;
    }
    else if (update.action === "subtract") {
        if (flags[update.flag] === undefined)
            flags[update.flag] = -update.new_value;
        else
            flags[update.flag] -= update.new_value;
    }
    else if (update.action === "set") {
        flags[update.flag] = update.new_value;
    }
    else if (update.action === "append") {
        if (flags[update.flag] === undefined)
            flags[update.flag] = [];
        flags[update.flag].push(update.new_value);
    }
    
};

const set_current_img = (path) => {
    current_img = path;
    document.getElementById("image_display").src = current_img;
};

const set_message = (text) => {
    message = text;
    document.getElementById("textbox").innerHTML = insert_char_name(message);
};

const set_options = (data) => {
    options = data;
    document.getElementById("options").innerHTML = "";
    options.forEach(option => add_option(option));
};

const insert_char_name = (str) => {
    return str.replaceAll("{{name}}", char_name);
};

const download_save = () => {
    let data = format_save();
    const a = document.createElement('a');
    const file = new Blob([data], {type:  'text/plain'});
  
    a.href= URL.createObjectURL(file);
    a.download = "save_" + save_name + ".js";
    a.click();
    
    URL.revokeObjectURL(a.href);
};

const format_save = () => {
    let save_date = "set_char_name(\"" + char_name + "\");\n";
    save_date += "set_current_file(\"" + current_file + "\");\n";
    
    save_date += "set_flags({";
    const pairs = Object.entries(flags);
    
    pairs.forEach(pair => save_date += format_pair(pair));
    
    save_date = save_date.slice(0, -1);
    save_date += "\n});\n\n";
    
    
    save_date += "play_scene();";
    return save_date;
};

const format_pair = (pair) => {
    let str = "\n\t" + pair[0] + ": ";
    if(typeof(pair[1]) === typeof("string"))
        str += "\"" + String(pair[1]) + "\",";
    else if (typeof(pair[1]) === typeof([])) {
        str += "[";
        pair[1].forEach(item => str += "\"" + item + "\", ");
        str += "],";
    }
    else
        str += String(pair[1]) + ",";
    return str;
};

const load_save = (save) => {
    save_name = save;
    loadData(current_game + "/saves/save_" + save_name + ".js", "save")
};

const start_new_game = () => {
    set_message("Enter a character name");
    document.getElementById("options").innerHTML = "";
    
    let item = document.createElement("li");
    item.innerHTML = "";
    
    let text_field = document.createElement("input");
    text_field.classList.add("text_input");
    text_field.setAttribute("type", "text");
    text_field.id = "char_name";
    item.appendChild(text_field);
    
    let button = document.createElement("button");
    button.classList.add("menu_button");
    button.innerHTML = "start";
    button.addEventListener("click", (event) => {
        char_name = document.getElementById("char_name").value;
        load_save("start");
    });
    
    item.appendChild(button);
    document.getElementById("options").appendChild(item);
};

load_game_css = () => {
    var link = document.createElement('link');

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = current_game + "/game_files/code/style.css";

    document.getElementsByTagName('HEAD')[0].appendChild(link);
};

load_game_functions = () => {
    loadData(current_game + "/game_files/code/functions.js", "functions");
};

init_game();
