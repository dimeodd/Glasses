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

        var exList = ws.GetExcludeElID_List()
        var i = 0;
        ws.data.components.forEach(element => {
            div.appendChild(ElFactrory.CreateInputElement(i, exList));
            i++;
        });
        return div;
    }
    static CreateInputElement(index, excludeList) {
        var div = document.createElement('div');
        var component = ws.data.components[index];

        var sel_index = table1.indexOf(component.select);
        var select = document.createElement('select');
        for (let i = 0; i < table1.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.innerText = table1[i].name;
            select.appendChild(option);

            if (excludeList.indexOf(i) != -1) option.classList.add("red");
        }
        select.onchange = function () {
            component.select = table1[select.value];
            ws.Redraw();
        }
        select.value = sel_index;

        for (let i = 0, iMax = ws.data.components.length; i < iMax; i++) {
            if (i == index) continue;
            const element = ws.data.components[i];
            if (element.select == component.select) {
                div.classList.add("red");
            }
        }


        var min = component.select.m_min;
        var max = component.select.m_max;

        var input = document.createElement('input');
        input.type = 'number';
        input.min = min;
        input.max = max;
        input.style.width = "40px";
        input.onchange = function () {
            if (input.value < min) input.value = min;
            if (input.value > max) input.value = max;
            component.mass = input.value;
            ws.Redraw();
        }
        if(component.mass > max)  component.mass = max;
        if(component.mass < min)  component.mass = min;
        input.value = component.mass;


        var a = document.createElement('a');
        a.innerText = '%    (' + min + ' - ' + max + ')';
        a.innerText += ';  (elKTR) α=' + glass_f1(component.select, component.mass);

        div.appendChild(select);
        div.appendChild(input);
        div.appendChild(a);

        return div;
    }
}