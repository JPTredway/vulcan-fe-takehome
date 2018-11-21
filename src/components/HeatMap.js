import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #ccc;
  box-shadow: 5px 5px 15px #dfdfdf;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: 9fr 1fr;
  overflow: scroll;
`;

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  border-spacing: 0;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */

  th,
  td {
    padding: 10px;
  }
`;

const StyledTd = styled.td`
  border: 1px solid white;
  ${({ val }) =>
    `background: hsl(${(1 - val) * 60}, 100%, 50%);
     color: ${val > 0.5 ? "white" : "black"}
    `}
`;

const Legend = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  padding: 2px;
  margin: 76px auto 0;
  width: 30%;
  background: linear-gradient(hsl(0, 100%, 55%), hsl(60, 100%, 55%));
`;

const LegendNums = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;

  p {
    margin: 0;
    align-self: flex-end;
  }
`;

const HeatMap = ({ data }) => {
  const dayNames = Object.keys(data);
  const dayValues = Object.values(data);

  const [lowest, highest] = dayValues.reduce(
    (c, v) => {
      v.forEach(num => {
        if (num < c[0]) c[0] = num;
        if (num > c[1]) c[1] = num;
      });
      return c;
    },
    [Infinity, -Infinity]
  );

  return (
    <Wrapper>
      <StyledTable>
        <tbody>
          <tr>
            <td />
            <th colSpan={7}>Search Impr. Share</th>
          </tr>
          <tr>
            <th>Hour Of Day</th>
            {dayNames.map((day, i) => (
              <th key={i}>{day}</th>
            ))}
          </tr>
          {dayValues[0].map((_, i) => (
            <tr key={i}>
              <th>{i}</th>
              {dayValues.map((v, ix) => (
                <StyledTd key={ix} val={(v[i] - lowest) / (highest - lowest)}>
                  {v[i]}
                </StyledTd>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Legend>
        {Array(5)
          .fill(null)
          .map((_, i, arr) => (
            <LegendNums key={i}>
              <p>
                {Math.floor(
                  (highest - lowest) * ((arr.length - 1 - i) * 0.2) + lowest
                )}
              </p>
            </LegendNums>
          ))}
      </Legend>
    </Wrapper>
  );
};

export default HeatMap;
