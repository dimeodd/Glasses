class ElFactrory {

    static CalculateButton() {
        var button = document.createElement('button');
        button.innerText = 'calc';
        button.onclick = function () {
            ws.Calculate()
        }
        return button;
    }

    static AddButton() {
        var button = document.createElement('button');
        button.innerText = '+';
        button.onclick = function () {
            ws.data.components.push(new Component());
            ws.Redraw();
        }
        return button;
    }

    static CreateInputList() {
        var div = document.createElement('div');

        var i = 0;
        ws.data.components.forEach(element => {
            div.appendChild(ElFactrory.CreateInputElement(i));
            i++;
        });
        return div;
    }
    static CreateInputElement(index) {
        var div = document.createElement('div');
        var component =  ws.data.components[index];

        var select = document.createElement('select');
        for (let i = 0; i < table1.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.innerText = table1[i].name;
            select.appendChild(option);
        }
        select.onchange = function () {
            component.select = table1[select.value];
            ws.Redraw();
        }
        select.value = table1.indexOf(component.select);


        var min = component.select.m_min;
        var max = component.select.m_max;

        var input = document.createElement('input');
        input.type = 'number';
        input.min = min;
        input.max = max;
        input.onchange = function () {
            component.mass = input.value;
        }
        input.value = component.mass;


        var a = document.createElement('a');
        a.innerText = '(' + min + ' - ' + max + ')';

        div.appendChild(select);
        div.appendChild(input);
        div.appendChild(a);

        return div;
    }
}