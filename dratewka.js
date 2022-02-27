class Location{
    constructor(description, image, color, x, y){
        this.description = description
        this.image = image
        this.color = color
        this.directions_to_go = []
        this.x = x
        this.y = y
        this.items = []
    }
}

map = {
    location_list: [],
    current_location: 27,
    current_location_object: null,

    make_location: function(){
        let length = locations.length
        
        for (let i = 0; i < length; i++){
            
            let location = new Location(locations[i].description, locations[i].img, locations[i].color, locations[i].x, locations[i].y)
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
        directions_element.textContent = "You can go: WEST, NORTH, EAST, SOUTH"

        let items_visible_element = document.createElement('h2')
        if(this.current_location_object.items.length == 0){
            items_visible_element.textContent = "You see nothing"
        }
        else{
            items_visible_element.textContent = "You see:"
            for(let i in this.current_location_object.items){
                items_visible_element.textContent += this.current_location_object.items[i]
            }
        }

        let player_items_element = document.createElement('h2')
        
        if(player.items.length == 0){
            player_items_element.textContent = "You are carrying nothing"
        }
        else{
            player_items_element.textContent = "You carry: "

            for(let i in player.items){
                player_items_element.textContent += player.items[i]
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
            code = e.code
            console.log(code)

            if(code == "Enter" || code == "NumpadEnter"){
                map.command = input.value
            }
        })
    }

}

player = {
    x: 7,
    y: 4,
    items: []
} 

console.log(locations.length)
map.make_location()
map.get_current_location()
map.render_location()
map.focus_input()
map.add_enter_submission()
console.log(map.location_list)