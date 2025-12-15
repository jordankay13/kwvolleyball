class TeamTable extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const numberOfTeams = 9;
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
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.width = "336pt";
        table.style.marginLeft = "auto";
        table.style.marginRight = "auto";
        table.style.borderSpacing = "0px";
        table.style.padding = "0px";
        table.style.backgroundColor = "BurlyWood";
        table.style.border = "2px solid black";

        const totalRows = Math.floor(numberOfTeams / 2) + numberOfTeams % 2;
        for (let row = 1; row <= totalRows; row++) {
            let currentRow = document.createElement("tr");
            currentRow.style.height = "20px";

            for (let i = 0; i <= 1; i++) {
                const teamNumber = row + (i * totalRows);
                const teamName = this.getAttribute(`team${teamNumber}`);
                if (teamName === null) {
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

        shadow.appendChild(style);
        shadow.appendChild(table);
    }
}

customElements.define("team-table", TeamTable);
