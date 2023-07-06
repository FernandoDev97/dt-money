import { PriceHighlight, TableContainer } from "./styles";

export function Table() {
  return (
    <TableContainer>
      <tbody>
        <tr>
          <td width='50%'>Desenvolvimento de site</td>
          <td>
            <PriceHighlight variant="income">
              R$ 12.000,00
            </PriceHighlight>
          </td>
          <td>Venda</td>
          <td>13/04/2022</td>
        </tr>
        <tr>
          <td width='50%'>Hamburger</td>
          <td>
            <PriceHighlight variant="outcome">
              - R$ 59,00
            </PriceHighlight>
          </td>
          <td>Saída</td>
          <td>10/04/2022</td>
        </tr>
      </tbody>
    </TableContainer>
  );
}
