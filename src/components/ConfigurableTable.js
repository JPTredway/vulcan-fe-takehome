import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-column-gap: 10px;
  align-items: start;
  width: 100%;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
`;

const Query = styled.input`
  border: none;
  margin-bottom: 10px;
  width: 100%;
  height: 2rem;
  background: transparent;
  border-bottom: 1px solid rgb(200, 200, 200);
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  font-size: 1rem;
  align-self: start;

  &:focus {
    outline: none;
    border-bottom: 1px solid rgb(0, 120, 255);
  }
`;

const FilterContainer = styled.div`
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 15px #dfdfdf;
`;

const StyledTable = styled.table`
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 5px;
  border-spacing: 0;
  box-shadow: 5px 5px 15px #dfdfdf;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */

  th,
  td {
    padding: 10px;
  }

  td.badQuery {
    color: rgb(180, 20, 20);
    text-align: center;
  }
`;

const StyledBody = styled.tbody`
  tr:nth-child(odd) {
    background: #fafafa;
  }
`;

const StyledTh = styled.th`
  cursor: pointer;
  width: 250px;
  text-align: left;
`;

class ConfigurableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnHeaders: [
        "meat",
        "protein (g)",
        "calories (cal)",
        "carbohydrates (g)",
        "fat (g)"
      ],
      rows: [
        ["chicken breast", "25g", "200cal", "37g", "8g"],
        ["fried chicken", "45g", "450cal", "21g", "16g"],
        ["beef stew", "20g", "250cal", "8g", "14g"],
        ["mashed potatoes", "4g", "214cal", "35g", "7g"],
        ["hot ham water", "0g", "0cal", "0g", "20g"],
        ["hot ham", "29g", "203cal", "2.1g", "8g"]
      ],
      sortedBy: "",
      order: "asc",
      query: "",
      filters: []
    };
  }

  componentDidMount() {
    this.setState(
      {
        sortedBy: this.state.columnHeaders[0] || "",
        filters: [...this.state.columnHeaders]
      },
      () => this.sortTable(this.state.columnHeaders[0], 0)
    );
  }

  toggleCheck = (filter, i) => {
    const filters = [...this.state.filters];
    this.state.filters[i] === filter
      ? (filters[i] = null)
      : (filters[i] = filter);
    this.setState({ filters });
  };

  sortRows = i => {
    const { rows, order } = this.state;
    const newRows = [...rows.map(r => [...r])].sort((a, b) => {
      const [first, second] = this.getCompareItems(a, b, i);
      if (order === "asc") {
        return first > second ? 1 : -1;
      } else {
        return first < second ? 1 : -1;
      }
    });

    this.setState({ rows: newRows });
  };

  getCompareItems = (a, b, i) => {
    let num1 = a[i].match(/\d+(\.\d{1,2})?/);
    let num2 = b[i].match(/\d+(\.\d{1,2})?/);
    const first = num1 ? parseFloat(num1[0]) : a[i];
    const second = num2 ? parseFloat(num2[0]) : b[i];

    return [first, second];
  };

  sortTable = (sortedBy, i) => {
    if (this.state.sortedBy === sortedBy) {
      const order = this.state.order === "asc" ? "desc" : "asc";
      this.setState({ order }, () => this.sortRows(i));
    } else {
      this.setState({ sortedBy }, () => this.sortRows(i));
    }
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { columnHeaders, sortedBy, rows, order, filters, query } = this.state;

    const rowData = rows.map((row, i) => {
      let isInQuery = query ? false : true;

      const rowArr = [];
      row.forEach((cell, i) => {
        if (cell.includes(query)) isInQuery = true;
        rowArr.push(filters[i] && <td key={i}>{cell}</td>);
      });

      return isInQuery && <tr key={i}>{rowArr}</tr>;
    });

    return (
      <Wrapper>
        <Filters>
          <Query
            placeholder="Enter a query..."
            value={this.state.query}
            onChange={this.handleChange}
          />
          <FilterContainer columns={columnHeaders.length}>
            {columnHeaders.map((filter, i) => (
              <label key={i}>
                <input
                  filter={filter}
                  type="checkbox"
                  checked={Boolean(filters[i])}
                  onChange={() => this.toggleCheck(filter, i)}
                />
                {filter}
              </label>
            ))}
          </FilterContainer>
        </Filters>
        <StyledTable>
          <thead>
            <tr>
              {columnHeaders.map(
                (header, i) =>
                  filters[i] && (
                    <StyledTh key={i} onClick={() => this.sortTable(header, i)}>
                      {header}
                      {sortedBy === header && (order === "asc" ? " ↓" : " ↑")}
                    </StyledTh>
                  )
              )}
            </tr>
          </thead>
          <StyledBody>
            {rowData.some(row => row) ? (
              rowData
            ) : (
              <td className="badQuery" colSpan={columnHeaders.length}>
                <h2>No records matched the specified query</h2>
              </td>
            )}
          </StyledBody>
        </StyledTable>
      </Wrapper>
    );
  }
}

export default ConfigurableTable;
