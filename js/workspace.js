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
        owner.appendChild(ElFactrory.CreateInputList());
        owner.appendChild(ElFactrory.AddButton());
        owner.appendChild(ElFactrory.CalculateButton());
    }

    Calculate() {
        var ktr = 0;
        var calcList = [];
        this.data.components.forEach(component => {
            calcList.push({ chimEl: component.select, mass: component.mass });
        });

        calcList.forEach(el => {
            var elKTR = glass_f1(el.chimEl, el.mass)
            ktr += elKTR * el.mass / 100;
        })

        alert(ktr);
    }
}

function glass_f1(element, mass) {
    var a = mass - element.m_min;
    a /= element.m_max - element.m_min;

    return lerp(element.ktr_max, element.ktr_min, a);

}

function lerp(a, b, value) {
    // return a * (1 - value) + b * value;
    return a + (b - a) * value;
}