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
  date: Date;
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
        bold: true,
      },
      {
        text: "URL",
        bold: true,
      },
      {
        text: "Data pobrania ceny",
        bold: true,
      },
      {
        text: "Cena USD",
        bold: true,
      },
      {
        text: "Cena PLN",
        bold: true,
      },
    ],
  ];

  prices.forEach((price) => {
    assetExplenationTableBody.push([
      {
        text: price.name,
      },
      {
        text: price.url,
      },
      {
        text: price.date.toLocaleString(),
      },
      {
        text: price.price.toFixed(2),
      },
      {
        text: (price.price * usdPrice).toFixed(2),
      },
    ]);
  });

  return [
    {
      text: `Szczegółowe wyjaśnienie cen ${assetName}`,
      fontSize: 12,
      color: "black",
      margin: [0, 10, 0, 10],
    },
    {
      table: {
        body: assetExplenationTableBody,
        widths: ["auto", "*", "auto", "auto", "auto"],
      },
      layout: "lightHorizontalLines",
      fontSize: 10,
      color: "black",
      margin: [0, 0, 0, 16],
    },
  ];
}

export const generatePDFReport = (
  caseInfo: CaseData,
  cryptoInfoList: AssetData[],
  usdPrice: NbpPrice
) => {
  for (const info of cryptoInfoList) {
    if (info.prices.length < 3) {
      alert(
        "Brak wystarczających danych dla " +
          info.name +
          " (" +
          info.symbol +
          ")" +
          " aby wygenerować raport." +
          "\n" +
          "Każde kryptoaktywo musi mieć przynajmniej 3 źródła cenowe."
      );
      return;
    }
  }

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
      { text: info.amount.toFixed(2), fontSize: 10, color: "black" },
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
                [`Kurs NBP:`, `z dnia:`],
                [
                  {
                    text: `${usdPrice.price} USD/PLN`,
                    bold: true,
                  },
                  {
                    text: usdPrice.date.toLocaleDateString(),
                    bold: true,
                  },
                ],
              ],
            },
          ],
        ],
      },
      {
        text: "Szacowana wartość kryptoaktywów",
        fontSize: 14,
        bold: true,
        margin: [0, 30, 0, 10],
      },
      {
        table: {
          body: avgPriceTableBody,
          widths: ["*", "auto", "auto", "auto"],
        },
        width: "100%",
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 16],
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

// // generate PDF report with dummy data
// const dummyCaseInfo: CaseData = {
//   organName: "Sąd Rejonowy w Gdańsku",
//   owner: "Jan Kowalski",
//   id: "123456789",
//   caseId: "123/2021",
// };

// const dummyCryptoInfoList: AssetData[] = [
//   {
//     name: "Bitcoin",
//     symbol: "BTC",
//     amount: 0.1,
//     avgPrice: 10000,
//     value: 1000,
//     prices: [
//       {
//         name: "Coinbase",
//         url: "https://www.coinbase.com/",
//         price: 10000,
//         date: new Date(),
//       },
//       {
//         name: "Kraken",
//         url: "https://www.kraken.com/",
//         price: 10000,
//         date: new Date(),
//       },
//       {
//         name: "Zonda",
//         url: "https://www.zonda.com/",
//         price: 10000,
//         date: new Date(),
//       },
//     ],
//   },
// ];

// generatePDFReport(dummyCaseInfo, dummyCryptoInfoList, {
//   price: 3.8,
//   date: new Date(),
// });
