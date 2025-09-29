import React, { useState } from "react";
import Card, { CardHeader, CardContent } from "../ui/Card";
import type { CravingAssessment, ChartTimeframe } from "../../types";
import Button from "../ui/Button";

interface CravingChartProps {
  assessments: CravingAssessment[];
  title?: string;
}

const CravingChart: React.FC<CravingChartProps> = ({
  assessments,
  title = "Craving Intensity Over Time",
}) => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>("week");

  // Filter assessments based on timeframe
  const getFilteredAssessments = () => {
    const now = new Date();
    let cutoff = new Date();

    switch (timeframe) {
      case "day":
        cutoff.setDate(now.getDate() - 1);
        break;
      case "week":
        cutoff.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case "year":
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
    }

    return assessments
      .filter((a) => a.timestamp >= cutoff.getTime())
      .sort((a, b) => a.timestamp - b.timestamp);
  };

  const filteredAssessments = getFilteredAssessments();

  // Process data for the chart
  const chartData = () => {
    if (filteredAssessments.length === 0) {
      return [];
    }

    const dateFormat: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      ...(timeframe === "year" && { year: "numeric" }),
      ...(timeframe === "day" && { hour: "numeric", minute: "2-digit" }),
    };

    return filteredAssessments.map((a) => ({
      date: new Date(a.timestamp).toLocaleDateString("en-US", dateFormat),
      intensity: a.intensity,
    }));
  };

  const data = chartData();

  // Calculate average intensity
  const averageIntensity =
    filteredAssessments.length > 0
      ? Math.round(
          (filteredAssessments.reduce((sum, a) => sum + a.intensity, 0) /
            filteredAssessments.length) *
            10
        ) / 10
      : 0;

  // Calculate max intensity
  const maxIntensity =
    filteredAssessments.length > 0
      ? Math.max(...filteredAssessments.map((a) => a.intensity))
      : 0;

  // Get color based on average intensity
  const getColor = (intensity: number) => {
    if (intensity <= 3) return "text-green-600";
    if (intensity <= 6) return "text-amber-600";
    return "text-red-600";
  };

  // Chart rendering
  const renderChart = () => {
    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-400">
            No data available for selected timeframe
          </p>
        </div>
      );
    }

    const maxHeight = 150;
    const barWidth = `${100 / (data.length * 2)}%`;

    return (
      <div className="flex flex-col h-48">
        <div className="flex-1 flex items-end">
          {data.map((point, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-end"
              style={{ width: `${100 / data.length}%` }}
            >
              <div
                className={`rounded-t transition-all duration-500 ${
                  point.intensity <= 3
                    ? "bg-green-500"
                    : point.intensity <= 5
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
                style={{
                  height: `${(point.intensity / 10) * maxHeight}px`,
                  width: barWidth,
                  minWidth: "8px",
                  maxWidth: "40px",
                }}
              ></div>
              <div
                className="text-xs mt-1 text-gray-500 truncate"
                style={{ maxWidth: "80px" }}
              >
                {point.date}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-2 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">
              Y-axis: Intensity (1-7)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Average:</span>
            <span className={`text-sm font-bold ${getColor(averageIntensity)}`}>
              {averageIntensity}
            </span>
            <span className="text-sm font-medium ml-2">Max:</span>
            <span className={`text-sm font-bold ${getColor(maxIntensity)}`}>
              {maxIntensity}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader
        title={title}
        subtitle={`Showing data for the last ${timeframe}`}
        action={
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant={timeframe === "day" ? "primary" : "outline"}
              onClick={() => setTimeframe("day")}
            >
              Day
            </Button>
            <Button
              size="sm"
              variant={timeframe === "week" ? "primary" : "outline"}
              onClick={() => setTimeframe("week")}
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={timeframe === "month" ? "primary" : "outline"}
              onClick={() => setTimeframe("month")}
            >
              Month
            </Button>
            <Button
              size="sm"
              variant={timeframe === "year" ? "primary" : "outline"}
              onClick={() => setTimeframe("year")}
            >
              Year
            </Button>
          </div>
        }
      />
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
};

export default CravingChart;
