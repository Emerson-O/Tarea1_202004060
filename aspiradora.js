// Define the reflex agent
function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

//  Inicializa los estados y el historial de los estados visitados
function test(states, history) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);

     // Registra la ubicación actual, la acción y los estados de la habitación
    document.getElementById("log").innerHTML += "<br>Location: " + location + " | Action: " + action_result;
    document.getElementById("log").innerHTML += " ---- Room A: " + states[1] + " | Room B: " + states[2];

    // Registra el estado actual en el historial.
    let currentState = { location: location, stateA: states[1], stateB: states[2] };
    let stateExists = history.some(h => JSON.stringify(h) === JSON.stringify(currentState));

    if (!stateExists) {
        history.push(currentState);
    }

    // Actualizar estados según el resultado de la acción
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") {
        states[0] = "B";
    } else if (action_result == "LEFT") {
        states[0] = "A";
    }
    
    //Comprueba si ambas habitaciones están limpias
    if (states[1] == "CLEAN" && states[2] == "CLEAN") {
        // Record the state even if both rooms are clean
        let cleanState = { location: states[0], stateA: states[1], stateB: states[2] };
        let cleanStateExists = history.some(h => JSON.stringify(h) === JSON.stringify(cleanState));

        if (!cleanStateExists) {
            history.push(cleanState);
        }
        
        // Si se han visitado menos de 8 estados únicos, reinicie las salas y continúe
        if (history.length < 8) {
            states[1] = "DIRTY";
            states[2] = "DIRTY";
        } else {
            // Detener si se han visitado 8 estados únicos
            document.getElementById("log").innerHTML += "<br><br>8 estados unicos visitados o ambas habitaciones estan limpias. Parada.";
            document.getElementById("log").innerHTML += "<br><b>Estados visitados:</b> ";
            for (let i = 0; i < history.length; i++) {
                document.getElementById("log").innerHTML += `<br>State ${i + 1}: Location: ${history[i].location} | Room A: ${history[i].stateA} | Room B: ${history[i].stateB}`;
            }
            return;
        }
    }
    
    setTimeout(function() { test(states, history); }, 2000);
}

// Initial states and history
var states = ["A", "DIRTY", "DIRTY"];
let history = [];
test(states, history);
