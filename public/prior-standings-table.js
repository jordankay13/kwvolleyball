class PriorStandingsTable extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback() {
        const dataSource = this.getAttribute("data-source");
        if (!dataSource) {
            console.error("Data source not specified for PriorStandingsTable");
            return;
        }
        const seasonTitle = this.getAttribute("season-title");
        if (!seasonTitle) {
            console.error("Season title not specified for PriorStandingsTable");
            return;
        }
        const response = await fetch(dataSource);
        const data = await response.json();

        const numberOfTeams = 9;
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = `
            .previous-standings {
                height: 26px;
                width: 64px;
                color: black;
                font-size: 11.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Calibri, sans-serif;
                text-align: center;
                vertical-align: center;
                white-space: normal;
                border-left: 1.0pt solid black;
                border-right: 1.0pt solid black;
                border-top-style: none;
                border-top-color: inherit;
                border-top-width: medium;
                border-bottom: 1.0pt solid black;
                padding-left: 1px;
                padding-right: 1px;
                padding-top: 1px;
            }
        `
        const span = document.createElement("span");
        span.style.fontFamily = 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif';
        span.textContent = seasonTitle;

        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.width = "323pt";
        table.style.marginLeft = "auto";
        table.style.marginRight = "auto";
        table.style.borderSpacing = "0px";
        table.style.padding = "0px";
        table.style.backgroundColor = "#FFFFC0";

        const colGroup = document.createElement("colgroup");
        const col1 = document.createElement("col");
        col1.width = "64";
        const col2 = document.createElement("col");
        col2.width = "174";
        const col3 = document.createElement("col");
        col3.width = "64";
        col3.span = "3";
        colGroup.appendChild(col1);
        colGroup.appendChild(col2);
        colGroup.appendChild(col3);
        table.appendChild(colGroup);

        const firstRow = document.createElement("tr");
        firstRow.style.height = "21px";
        firstRow.style.borderTop = "1.0pt solid black";

        const column1 = document.createElement("td");
        column1.className = "previous-standings";
        firstRow.appendChild(column1);
        const column2 = document.createElement("td");
        column2.className = "previous-standings";
        column2.textContent = "Team";
        firstRow.appendChild(column2);
        const column3 = document.createElement("td");
        column3.className = "previous-standings";
        column3.textContent = "Win";
        firstRow.appendChild(column3);
        const column4 = document.createElement("td");
        column4.className = "previous-standings";
        column4.textContent = "Loss";
        firstRow.appendChild(column4);
        const column5 = document.createElement("td");
        column5.className = "previous-standings";
        column5.textContent = "Pct";
        firstRow.appendChild(column5);
        table.appendChild(firstRow);

        for (let key in data) {

            const row = document.createElement("tr");
            const teamCol1 = document.createElement("td");
            teamCol1.className = "previous-standings";
            teamCol1.textContent = key;
            row.appendChild(teamCol1);
            const teamCol2 = document.createElement("td");
            teamCol2.className = "previous-standings";
            teamCol2.textContent = data[key]["team_name"];
            row.appendChild(teamCol2);
            const teamCol3 = document.createElement("td");
            teamCol3.className = "previous-standings";
            teamCol3.textContent = data[key]["wins"];
            row.appendChild(teamCol3);
            const teamCol4 = document.createElement("td");
            teamCol4.className = "previous-standings";
            teamCol4.textContent = data[key]["losses"];
            row.appendChild(teamCol4);
            const teamCol5 = document.createElement("td");
            teamCol5.className = "previous-standings";
            teamCol5.textContent = (100 * data[key]["wins"] / (data[key]["wins"] + data[key]["losses"])).toFixed(2) + "%";
            row.appendChild(teamCol5);
            table.appendChild(row);

        }

        shadow.appendChild(style);
        shadow.appendChild(span);
        shadow.appendChild(table);
    }
}

customElements.define("prior-standings-table", PriorStandingsTable);
