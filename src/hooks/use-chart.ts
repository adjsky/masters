import React, { RefObject } from "react";
import { createChart } from "lightweight-charts";

import type { ChartOptions, DeepPartial } from "lightweight-charts";

const useChart = (chartData: number[], ref: RefObject<HTMLElement | null>) => {
  React.useEffect(() => {
    if (ref.current == null) {
      return;
    }

    const getResizeableChartOptions = (): DeepPartial<ChartOptions> => {
      const mobile = window.innerWidth <= 360;

      return {
        width: ref.current?.clientWidth,
        height: ref.current?.clientHeight,
        rightPriceScale: {
          visible: !mobile,
          borderColor: "#D9D9D9",
        },
        timeScale: {
          visible: !mobile,
          borderColor: "#D9D9D9",
        },
        crosshair: {
          horzLine: {
            visible: !mobile,
          },
          vertLine: {
            visible: !mobile,
          },
        },
      };
    };

    const handleResize = () => {
      chart.applyOptions(getResizeableChartOptions());
    };

    const chart = createChart(ref.current, {
      ...getResizeableChartOptions(),
      leftPriceScale: {
        visible: false,
      },
      layout: {
        textColor: "#D9D9D9",
        fontFamily: "Gotham Pro",
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#8A24F3",
      crosshairMarkerBackgroundColor: "#fff",
      crosshairMarkerBorderColor: "#8A24F3",
      priceLineVisible: false,
    });
    lineSeries.setData(
      chartData.map((value, index) => {
        let day = ((index + 1) % 31) + 1;
        const month = Math.trunc((index + 1) / 31) + 1;

        return {
          time: `2022-${month < 10 ? "0" + month : month}-${
            day < 10 ? "0" + day : day
          }`,
          value,
        };
      })
    );

    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, [chartData, ref]);
};

export default useChart;
