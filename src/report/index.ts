import pdfMake from "pdfmake/build/pdfmake";
import { CaseData } from "../pages/CaseDataPage";
import { AssetData } from "../components/CurrencyTable";
import { NbpPrice } from "../peripherals/NbpClient";

pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

interface Price {
  name: string;
  url: string;
  price: number;
}

function createAssetExplenationTable(
  assetName: string,
  prices: Price[],
  usdPrice: number
) {
  const assetExplenationTableBody: any = [
    [
      {
        text: "Nazwa giełdy",
        fontSize: 10,
        color: "black",
      },
      {
        text: "Cena USD",
        fontSize: 10,
        color: "black",
      },
      {
        text: "Cena PLN",
        fontSize: 10,
        color: "black",
      },
    ],
  ];

  prices.forEach((price) => {
    assetExplenationTableBody.push([
      {
        text: price.name,
        fontSize: 10,
        color: "black",
        link: price.url,
        underline: true,
      },
      {
        text: price.price.toFixed(2),
        fontSize: 10,
        color: "black",
      },
      {
        text: (price.price * usdPrice).toFixed(2),
        fontSize: 10,
        color: "black",
      },
    ]);
  });

  return [
    {
      text: `Szczegółowe wyjaśnienie wartości ${assetName}`,
      fontSize: 10,
      color: "black",
      margin: [42, 5, 0, 0],
    },
    {
      table: {
        body: assetExplenationTableBody,
      },
      layout: "lightHorizontalLines",
      fontSize: 10,
      color: "black",
      margin: [42, 10, 0, 0],
    },
  ];
}

export const generatePDFReport = (
  caseInfo: CaseData,
  cryptoInfoList: AssetData[],
  usdPrice: NbpPrice
) => {
  console.log(caseInfo, cryptoInfoList[0], usdPrice);

  // Create body for the table
  const avgPriceTableBody = [
    [
      { text: "Kryptoaktwo", fontSize: 10, color: "black" },
      { text: "Ilość", fontSize: 10, color: "black" },
      { text: "Średnia cena", fontSize: 10, color: "black" },
      { text: "Wartość", fontSize: 10, color: "black" },
    ],
  ];

  cryptoInfoList.forEach((info) => {
    avgPriceTableBody.push([
      { text: `${info.name} (${info.symbol})`, fontSize: 10, color: "black" },
      { text: info.amount.toString(2), fontSize: 10, color: "black" },
      { text: info.avgPrice.toFixed(2), fontSize: 10, color: "black" },
      { text: info.value?.toFixed(2), fontSize: 10, color: "black" },
    ]);
  });

  const docDefinition = {
    content: [
      {
        text: "Raport 30/09/23/1A",
        style: "header",
      },
      {
        columns: [
          [
            `Organ egzekucyjny: ${caseInfo.organName}`,
            `Posiadacz kryptoaktywa: ${caseInfo.owner}`,
            `ID posiadacza: ${caseInfo.id}`,
            `Data sporządzenia: ${new Date().toLocaleDateString()}`,
          ],
          [
            "Szacowanie wartości kryptoaktywów. Wartość PLN podana wg kursu USD/PLN NBP.",
            "\n",
            {
              columns: [
                {
                  text: `Kurs NBP z dnia ${usdPrice.date.toLocaleDateString()}: `,
                },
                {
                  text: `${usdPrice.price} USD/PLN`,
                  bold: true,
                },
              ],
            },
          ],
        ],
      },

      {
        table: {
          body: avgPriceTableBody,
        },
        layout: "lightHorizontalLines",
      },
      {
        table: {
          body: avgPriceTableBody,
        },
        layout: "lightHorizontalLines",
      },
      ...cryptoInfoList.flatMap((info) =>
        createAssetExplenationTable(
          `${info.name} (${info.symbol})`,
          info.prices,
          usdPrice.price
        )
      ),
    ],
    defaultStyle: {
      fontSize: 10,
    },
    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
    },
  };

  // Generate PDF
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  pdfMake.createPdf(docDefinition).download("Cryptocurrency_Report.pdf");
};

// Generate the report
// generatePDFReport(caseInfo, cryptoInfoList, 4.3244);
