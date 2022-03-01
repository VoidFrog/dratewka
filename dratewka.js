class Location {
    constructor(description, image, color, x, y, directions){
        this.description = description
        this.image = image
        this.color = color
        this.directions = directions
        this.x = x
        this.y = y
        this.items = []
    }
}

class Item {
    constructor(id, display_name, type, item_name){
        this.id = id
        this.display_name = display_name
        this.type = type
        this.name = item_name
    }
}

map = {
    all_items: [],
    location_list: [],
    current_location: 27,
    current_location_object: null,
    sheep_items_used: 0,
    dragon_killed: 0,

    init_game: function(){
        this.make_location()
        this.make_items()
        this.get_current_location()
        this.render_location()
        this.focus_input()
        this.add_enter_submission()
    },

    make_location: function(){
        let length = locations.length
        
        for (let i = 0; i < length; i++){
            
            let location = new Location(locations[i].description, locations[i].img, locations[i].color, locations[i].x, locations[i].y, locations[i].directions)
            this.location_list.push(location)
        
            if(location.x == 7 && location.y == 4){
                this.location_list.push("nie ma takiej lokacji")
                this.location_list.push("nie ma takiej lokacji")
                this.location_list.push("nie ma takiej lokacji")
            }
            if(location.x == 7 && location.y == 5){
                this.location_list.push("nie ma takiej lokacji")
                this.location_list.push("nie ma takiej lokacji")
                this.location_list.push("nie ma takiej lokacji")
            }
        }


    },

    make_items: function(){
        for(i in items){
            let item = new Item(items[i].id, items[i].display_name, items[i].type, items[i].name)

            this.place_item(item)
            this.all_items.push(item)
        }
    },

    place_item: function(item){
        if(item.id == 31){
            //13 - YX
            let location_position = 2
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 27){
            //15 - YX
            let location_position = 4
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 14){
            //17 - YX
            let location_position = 6
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 10){
            //23 - YX
            let location_position = 9
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 18){
            //27 - YX
            let location_position = 13
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 32){
            //32 - YX
            let location_position = 15
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 21){
            //44 - YX
            let location_position = 24
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 33){
            //55 - YX
            let location_position = 32
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
        else if(item.id == 24){
            //64 - YX
            let location_position = 38
            let location_to_place_item = this.location_list[location_position]

            location_to_place_item.items.push(item)
        }
    },

    get_current_location: function(){
        let x = player.x
        let y = player.y

        this.current_location = (y-1)*7 + x-1
        this.current_location_object = this.location_list[this.current_location]
    },

    render_location: function(){
        this.remove_previous_location()

        let description = this.current_location_object.description
        let color = this.current_location_object.color
        let img = this.current_location_object.image

        let description_element = document.createElement('h2')
        description_element.textContent = description

        let img_element = document.createElement('img')
        img_element.setAttribute('src', `./img/${img}`)
        img_element.style.backgroundColor = color

        let directions_element = document.createElement('h2')
        //make a function that identifies attribute - directions_to_go in locations object 
        directions_element.textContent = "You can go: "
        for(let i in this.current_location_object.directions){
            directions_element.textContent += this.current_location_object.directions[i].toUpperCase()
            if(i == this.current_location_object.directions.length - 1){
                directions_element.textContent += "  "
            }
            else{
                directions_element.textContent += ",  "
            }
        }

        let items_visible_element = document.createElement('h2')
        if(this.current_location_object.items.length == 0){
            items_visible_element.textContent = "You see nothing"
        }
        else{
            items_visible_element.textContent = "You see:"
            for(let i in this.current_location_object.items){
                items_visible_element.textContent += this.current_location_object.items[i].display_name
                if(i == this.current_location_object.items.length - 1){
                    items_visible_element.textContent += " "
                }
                else{
                    items_visible_element.textContent += ", "
                }
            }
        }

        let player_items_element = document.createElement('h2')
        
        if(player.items.length == 0){
            player_items_element.textContent = "You are carrying nothing"
        }
        else{
            player_items_element.textContent = "You carry: "

            for(let i in player.items){

                player_items_element.textContent += player.items[i].display_name
                if(i == player.items.length - 1){
                    player_items_element.textContent += " "
                }
                else{
                    player_items_element.textContent += ", "
                }
            }
        }

        content.append(description_element)
        content.append(img_element)
        content.append(directions_element)
        content.append(items_visible_element)
        content.append(player_items_element)
    },

    remove_previous_location: function(){
        let content_list = content.children
        let length = content_list.length
        console.log(content_list)

        if(length > 0){
            for(let i = length - 1; i >= 0; i--){
                content_list[i].remove()
            }
        }
        
    },

    focus_input: function(){
        document.addEventListener('click', function(){
            input.focus()
        })
        document.addEventListener('keydown', function(){
            input.focus()
        })
    },

    add_enter_submission: function(){
        document.addEventListener('keydown', function(e){
            let code = e.code
            console.log(code)

            if(code == "Enter" || code == "NumpadEnter"){
                map.command = input.value
                
                console.log(map.command)
                map.item_command_handler()

                map.command = map.command.toLowerCase()
                map.map_movement_handler()
                map.get_current_location()
                map.render_location()
            }
        })
    },

    item_command_handler: function(){
        console.log(this.current_location_object.items.length)

        if((map.command.includes("drop ") || map.command.includes("DROP ")) && this.current_location_object.items.length >= 3){
            alert("There are already too many items on the ground")
        }
        else if(map.command.includes("drop ") || map.command.includes("DROP ")){
            let item_name = map.command.substring(5, map.command.length)

            if(player.items.length > 0){
                for(let index in player.items){
                    if(player.items[index].name == item_name){
                        let dropped_item = player.items[index]

                        player.items.splice(index, 1)
                        this.current_location_object.items.push(dropped_item)
                    }
                }
            }
            else{
                alert("You do not carry any items")
            }
        }
        else if((map.command.includes("take ") || map.command.includes("TAKE ")) && player.items.length == 1){
            alert("You can't carry more items")
        }
        else if(map.command.includes("take ") || map.command.includes("TAKE ")){
            let item_name = map.command.substring(5, map.command.length)
            item_name = item_name.trim()

            console.log(this.current_location_object.items.length > 0)

            if(this.current_location_object.items.length > 0){
                for(let index in this.current_location_object.items){

                    console.log(this.current_location_object.items[index].name == item_name, item_name, this.current_location_object.items[index].name)

                    if(this.current_location_object.items[index].name == item_name){
                        let taken_item = this.current_location_object.items[index]

                        this.current_location_object.items.splice(index, 1)
                        player.items.push(taken_item)
                    }
                }
            }
            else{
                alert("There are no items to take")
            }
        }

        else if(map.command.includes("use ") || map.command.includes("USE ")){
            let item_name = map.command.substring(4, map.command.length)
            item_name = item_name.trim()

            let x = this.current_location_object.x
            let y = this.current_location_object.y

            let location_number = (y-1)*7 + x-1
            let result_item;


            if(location_number == 33 && player.items[0].id == 10){
                result_item = this.return_item_of_given_id(11)

                player.items.shift()
                player.items.push(result_item)
            }
            else if(location_number == 41 && player.items[0].id == 11){
                result_item = this.return_item_of_given_id(12)
                console.log(result_item)

                player.items.shift()
                player.items.push(result_item)
            }
            else if(location_number == 23 && player.items[0].id == 12){
                result_item = this.return_item_of_given_id(13)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
            }
            else if(location_number == 17 && player.items[0].id == 14){
                result_item = this.return_item_of_given_id(15)

                player.items.shift()
                player.items.push(result_item)
            }
            else if(location_number == 20 && player.items[0].id == 15){
                result_item = this.return_item_of_given_id(16)

                player.items.shift()
                player.items.push(result_item)
            }
            else if(location_number == 23 && player.items[0].id == 16){
                result_item = this.return_item_of_given_id(17)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
            }
            else if(location_number == 19 && player.items[0].id == 18){
                result_item = this.return_item_of_given_id(19)

                player.items.shift()
                player.items.push(result_item)
            }
            else if(location_number == 23 && player.items[0].id == 19){
                result_item = this.return_item_of_given_id(20)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
            }
            else if(location_number == 34 && player.items[0].id == 21){
                result_item = this.return_item_of_given_id(22)

                player.items.shift()
                player.items.push(result_item)
            }
            else if(location_number == 23 && player.items[0].id == 22){
                result_item = this.return_item_of_given_id(23)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
            }
            else if(location_number == 0 && player.items[0].id == 24){
                result_item = this.return_item_of_given_id(25)

                player.items.shift()
                player.items.push(result_item)
            }
            else if(location_number == 23 && player.items[0].id == 25){
                result_item = this.return_item_of_given_id(26)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
            }
            else if(location_number == 7 && player.items[0].id == 27){
                result_item = this.return_item_of_given_id(28)

                player.items.shift()
                player.items.push(result_item)
            }
            else if(location_number == 23 && player.items[0].id == 28){
                result_item = this.return_item_of_given_id(29)
                this.sheep_items_used += 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
            }
            else if(location_number == 23 && player.items[0].id == 37){
                result_item = this.return_item_of_given_id(30)

                this.dragon_killed = 1

                player.items.shift()
                this.current_location_object.items.push(result_item)
            }
            else if(location_number == 23 && player.items[0].id == 33 && this.dragon_killed == 1){
                result_item = this.return_item_of_given_id(34)

                player.items.shift()
                player.items.push(result_item)
            } 
            else if(location_number == 34 && player.items[0].id == 34){
                result_item = this.return_item_of_given_id(35)

                player.items.shift()
                this.current_location_object.items.push(result_item)
            }
            else if(location_number == 21 && player.items[0].id == 35){
                result_item = this.return_item_of_given_id(36)

                player.items.shift()
                this.current_location_object.items.push(result_item)

                this.ending_screen()
            }
            
            else{
                alert("you can't use this item here")
            }
   
            if(this.sheep_items_used == 6){
                this.current_location_object.items = []

                this.sheep_items_used += 1

                result_item = this.return_item_of_given_id(37)
                player.items.push(result_item)
            }  
            
            
        }
    },

    ending_screen: function(){
        alert("you won")
    },

    return_item_of_given_id: function(item_id){
        for(let i in this.all_items){
            if(this.all_items[i].id == item_id){
                return this.all_items[i]
            }
        }
    },

    map_movement_handler: function(){
        if(this.command == "east" || this.command == "e"){
            if(player.x < 7 && (this.check_directions_available() == true)){
                player.x += 1
            }
            else{
                alert("You can't go that way")
            }
        }

        else if(this.command == "west" || this.command == "w"){
            console.log(this.check_directions_available())
            if(player.x > 1  && (this.check_directions_available() == true)){
                if(!(player.y > 4 && player.x - 1 < 4)){
                    player.x -= 1
                }
                else{
                    alert("You can't go that way")
                }
            }
            else{
                alert("You can't go that way")
            }
        }

        else if(this.command == "north" || this.command == "n"){
            if(player.y > 1 && (this.check_directions_available() == true)){
                player.y -= 1
            }
            else{
                alert("You can't go that way")
            }
        }

        else if(this.command == "south" || this.command == "s"){
            if(player.y < 6 && (this.check_directions_available() == true)){
                if(!((player.y+1 == 5 || player.y+1 == 6) && player.x < 4)){
                    player.y += 1
                }
                else{
                    alert("You can't go that way")
                }
            }
            else{
                alert("You can't go that way")
            }
        }
    },

    check_directions_available: function(){
        let command = map.command

        if(command == "s"){
            command = "south"
        }
        else if(command == "n"){
            command = "north"
        }
        else if(command == "w"){
            command = "west"
        }
        else if(command == "e"){
            command = "east"
        }

        directions_list = this.current_location_object.directions

        if(directions_list.indexOf(command) != -1){
            return true
        }
        else{
            return false
        }
    }

}

player = {
    x: 7,
    y: 4,
    items: []
} 


map.init_game()
console.log(locations.length)
console.log(map.location_list)