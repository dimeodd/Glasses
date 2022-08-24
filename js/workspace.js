var owner;

class Component {
    select = table1[0];
    mass = 100;
}
class Data {
    components = [new Component()];
}

class Workspace {
    data = new Data();
    Init() {
        owner = document.getElementById('workspace');
        this.Redraw();
    }

    Redraw() {
        owner.innerHTML = '';
        var i = 0;
        this.data.components.forEach(element => {
            owner.appendChild(CreateInputName(i));
            i++;
        });
        owner.appendChild(AddComponent());
        owner.appendChild(Calculate());
    }
    Calculate() {
        TestPercent();
        debugger;
        var ktr = 0;
        this.data.components.forEach(component => {
            var chim_element = component.select;
            var elKTR = f1(chim_element, component.mass)
            ktr += elKTR * component.mass / 100;
        });
        alert(ktr);

        function TestPercent() {

        }
    }
}

function f1(element, mass) {
    var a = mass - element.m_min;
    a /= element.m_max - element.m_min;

    return lerp(element.ktr_max, element.ktr_min, a);

}

function lerp(a, b, value) {
    return a * (1 - value) + b * value;
}
function AddComponent() {
    var button = document.createElement('button');
    button.innerText = 'calc';
    button.onclick = function () {
        ws.Calculate()
    }
    return button;
}

function Calculate() {
    var button = document.createElement('button');
    button.innerText = '+';
    button.onclick = function () {
        ws.data.components.push(new Component());
        ws.Redraw();
    }
    return button;
}

function CreateInputName(index) {
    var div = document.createElement('div');

    var select = document.createElement('select');
    for (let i = 0; i < table1.length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerText = table1[i].name;
        select.appendChild(option);
    }
    select.onchange = function () {
        ws.data.components[index].select = table1[select.value];
        sw.Redraw();
    }
    select.value = table1.indexOf(ws.data.components[index].select);

    var input = document.createElement('input');
    input.type = 'number';
    input.onchange = function () {
        ws.data.components[index].mass = input.value;
    }
    input.value = ws.data.components[index].mass;


    var a = document.createElement('a');
    a.innerText = '(' + ws.data.components[index].select.m_min + ' - '
        + ws.data.components[index].select.m_max + ')';

    div.appendChild(select);
    div.appendChild(input);
    div.appendChild(a);

    return div;
}