class TeamTable extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback() {
        const dataSource = this.getAttribute("data-source");
        if (!dataSource) {
            console.error("Data source not specified for TeamTable");
            return;
        }

        const response = await fetch(dataSource);
        const data = await response.json();

        const title = "Teams 2025-26";
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = `
            .team-list-number {
                color: black;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: bottom;
                white-space: nowrap;
                border-style: none;
                border-color: inherit;
                border-width: medium;
                padding-left: 1px;
                padding-right: 1px;
                padding-top: 1px;
            }

            .team-list {
                color: black;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: left;
                vertical-align: bottom;
                white-space: nowrap;
                border-style: none;
                border-color: inherit;
                border-width: medium;
                padding-left: 1px;
                padding-right: 1px;
                padding-top: 1px;
            }
        `
        const div = document.createElement("div");
        div.style.textAlign = "center";
        const span = document.createElement("span");
        span.style.fontFamily = 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif';

        const strong = document.createElement("strong");
        strong.textContent = title;

        span.appendChild(strong);
        div.appendChild(span);

        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.width = "336pt";
        table.style.marginLeft = "auto";
        table.style.marginRight = "auto";
        table.style.borderSpacing = "0px";
        table.style.padding = "0px";
        table.style.backgroundColor = "BurlyWood";
        table.style.border = "2px solid black";

        const numberOfTeams = Object.keys(data).length;
        const totalRows = Math.floor(numberOfTeams / 2) + numberOfTeams % 2;
        for (let row = 1; row <= totalRows; row++) {
            let currentRow = document.createElement("tr");
            currentRow.style.height = "20px";

            for (let i = 0; i < 2; i++) {
                const teamNumber = row + (i * totalRows);
                const teamName = data[teamNumber];
                if (teamName === undefined) {
                    break;
                }
                const teamNumberCell = document.createElement("td");
                teamNumberCell.className = "team-list-number";
                teamNumberCell.style.width = "52px";
                teamNumberCell.textContent = `${teamNumber}`;
                currentRow.appendChild(teamNumberCell);

                const teamNameCell = document.createElement("td");
                teamNameCell.className = "team-list";
                teamNameCell.style.width = "220px";
                teamNameCell.textContent = teamName;
                currentRow.appendChild(teamNameCell);
            }
            table.appendChild(currentRow);
        }

        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        div.appendChild(table);
        div.appendChild(document.createElement("br"));

        shadow.appendChild(style);
        shadow.appendChild(div);
    }
}

customElements.define("team-table", TeamTable);
