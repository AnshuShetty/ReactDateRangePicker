import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Popover,
  Typography,
  IconButton,
  Paper,
  useTheme,
  Button,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Close } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import Text from "@/theme/Text";

interface CustomDateRangePickerProps {
  defaultGapDays?: number;
  value?: { from: Dayjs | null; to: Dayjs | null };
  onChange?: (range: { from: Dayjs | null; to: Dayjs | null }) => void;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  // defaultGapDays = 15,
  value,
  onChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [startDate, setStartDate] = useState<Date | null>(
    value?.from ? value.from.toDate() : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    value?.to ? value.to.toDate() : null,
  );

  const [leftMonthOffset, setLeftMonthOffset] = useState(0);
  const [rightMonthOffset, setRightMonthOffset] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (onChange) {
      onChange({
        from: startDate ? dayjs(startDate) : null,
        to: endDate ? dayjs(endDate) : null,
      });
    }
  }, [startDate, endDate]);

  const handleDayClick = (date: Date) => {
    if (date < today) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }
    if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  };

  const addMonths = (date: Date, months: number) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };

  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  const getDaysDifference = (start: Date | null, end: Date | null): number => {
    if (!start || !end) return 0;
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isValidRange = (): boolean => {
    if (!startDate || !endDate) return true;
    return getDaysDifference(startDate, endDate) >= 15;
  };

  const formatRangeValue = () => {
    if (!startDate) return "";
    if (!endDate) return dayjs(startDate).format("DD-MM-YYYY");
    return `${dayjs(startDate).format("DD-MM-YYYY")} → ${dayjs(endDate).format(
      "DD-MM-YYYY",
    )}`;
  };

  const handleMonthChange = (dir: "prev" | "next") => {
    if (dir === "prev" && leftMonthOffset <= 0) return;
    setLeftMonthOffset((p) => p + (dir === "next" ? 1 : -1));
    setRightMonthOffset((p) => p + (dir === "next" ? 1 : -1));
  };

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  // 🧭 Format nicely for the top of the modal
  // const formattedDisplay = startDate
  //   ? endDate
  //     ? `${dayjs(startDate).format("MMM DD, YYYY")} → ${dayjs(endDate).format(
  //         "MMM DD, YYYY"
  //       )}`
  //     : `${dayjs(startDate).format("MMM DD, YYYY")} (select end date)`
  //   : "Select a date range";

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        value={formatRangeValue()}
        onClick={handleOpen}
        placeholder="Enter storage duration"
        fullWidth
        slotProps={{
          inputLabel: { shrink: true },
        }}
        sx={{
          "& .MuiInputBase-root": {
            padding: 0,
          },
          "& .MuiInputBase-input": {
            padding: 0,
          },
          "& fieldset": {
            border: "none",
          },
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{ vertical: "center", horizontal: "center" }}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: "20px",
            width: 720,
            maxWidth: "90vw",
            backgroundColor: theme.palette.background.default,
            position: "fixed !important",
            top: "50% !important",
            left: "50% !important",
            transform: "translate(-50%, -50%) !important",
            margin: 0,
          },
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          gap={0}
        >
          <Box display={"flex"} flexDirection={"column"} gap={1}>
            <Text variant="D3_MB">Storage Durations</Text>
            <Text variant="B2_R">
              <span style={{ color: theme.palette.primary.main }}>Note:</span>{" "}
              The storage must be booked for at least 15 days.
            </Text>
          </Box>
          <IconButton>
            <Close onClick={handleClose} />
          </IconButton>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: " flex",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box
            sx={{
              border: `1px solid ${theme.palette.grey[100]}`,
              borderRadius: 2,
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: !startDate
                  ? `2px solid ${theme.palette.primary.main}`
                  : "2px solid transparent",
                borderRadius: "8px",
                p: 1,
                transition: "border 0.3s ease",
              }}
            >
              <Stack>
                <Typography variant="B2_M" color={theme.palette.text.secondary}>
                  Start Date
                </Typography>
                <Typography
                  variant="B1_R"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {startDate
                    ? dayjs(startDate).format("DD-MM-YYYY")
                    : "Select Start Date"}
                </Typography>
              </Stack>
              {startDate && (
                <IconButton
                  size="small"
                  onClick={() => setStartDate(null)}
                  sx={{ p: 0.5 }}
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>
          <Box
            sx={{
              border: `1px solid ${theme.palette.grey[100]}`,
              borderRadius: 2,
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border:
                  startDate && !endDate
                    ? `2px solid ${theme.palette.primary.main}`
                    : "2px solid transparent",
                borderRadius: "8px",
                p: 1,
                transition: "border 0.3s ease",
              }}
            >
              <Stack>
                <Typography variant="B2_M" color={theme.palette.text.secondary}>
                  End Date
                </Typography>
                <Typography
                  variant="B1_R"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {endDate
                    ? dayjs(endDate).format("DD-MM-YYYY")
                    : "Select End Date"}
                </Typography>
              </Stack>
              {endDate && (
                <IconButton
                  size="small"
                  onClick={() => setEndDate(null)}
                  sx={{ p: 0.5 }}
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>
        </Box>

        {/* 🗓 Calendars Section */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            p: 1,
            borderRadius: 2,
            gap: 3,
            alignItems: "center",
            border: `1px solid ${theme.palette.grey[100]}`,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* Left Calendar */}
          <Box width={"100%"}>
            {/* Selected Dates Display */}
            {renderCalendar(addMonths(today, leftMonthOffset), "left")}
          </Box>

          {/* <Divider orientation="vertical" flexItem /> */}

          {/* Right Calendar */}
          <Box width={"100%"}>
            {renderCalendar(addMonths(today, rightMonthOffset), "right")}
          </Box>
        </Paper>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          {!isValidRange() && startDate && endDate && (
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.error.main,
                mt: 1,
                display: "block",
                textAlign: "center",
              }}
            >
              The facility duration must be at least 15 days.
            </Typography>
          )}
          <Stack direction="row" spacing={2}>
            {(startDate || endDate) && (
              <Button
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
                variant="text"
                size="medium"
                sx={{
                  width: "100%",
                  maxWidth: "200px",
                  color: theme.palette.grey[400],
                }}
              >
                Clear
              </Button>
            )}
            <Button
              onClick={handleClose}
              variant="contained"
              size="medium"
              disabled={!isValidRange() || !startDate || !endDate}
              sx={{
                width: "100%",
                maxWidth: "200px",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Popover>
    </Box>
  );

  // -- Calendar rendering below
  function renderCalendar(baseDate: Date, position: "left" | "right") {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay();

    const dates: (Date | null)[] = Array(startDay)
      .fill(null)
      .concat(
        Array.from(
          { length: daysInMonth },
          (_, i) => new Date(year, month, i + 1),
        ),
      );

    return (
      <Box sx={{ p: 2, bgcolor: theme.palette.background.default }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          {position === "left" && (
            <IconButton
              size="small"
              onClick={() => handleMonthChange("prev")}
              disabled={leftMonthOffset <= 0}
              sx={{ visibility: leftMonthOffset <= 0 ? "hidden" : "visible" }}
            >
              <ChevronLeft />
            </IconButton>
          )}
          {position === "right" && <Box sx={{ width: 40 }} />}
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, flex: 1, textAlign: "center" }}
          >
            {baseDate.toLocaleString("default", { month: "long" })} {year}
          </Typography>
          {position === "left" && <Box sx={{ width: 40 }} />}
          {position === "right" && (
            <IconButton size="small" onClick={() => handleMonthChange("next")}>
              <ChevronRight />
            </IconButton>
          )}
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(7, 36px)"
          gridTemplateRows="repeat(6, 32px)"
          justifyContent="center"
          rowGap={1}
          columnGap={0}
          sx={{ height: 250 }}
        >
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <Typography
              key={d}
              variant="caption"
              sx={{ textAlign: "center", color: "text.secondary", mb: 1 }}
            >
              {d}
            </Typography>
          ))}
          {dates.map((d, i) => {
            if (!d) return <Box key={i} />;
            const disabled = d < today;
            const isStart = startDate && isSameDay(d, startDate);
            const isEnd = endDate && isSameDay(d, endDate);
            const inRange =
              startDate && endDate && d > startDate && d < endDate;

            const backgroundColor =
              isStart || isEnd
                ? theme.palette.primary.main
                : inRange
                  ? "#dcecffff"
                  : "transparent";

            const textColor =
              isStart || isEnd
                ? theme.palette.background.default
                : inRange
                  ? theme.palette.text.primary
                  : disabled
                    ? theme.palette.text.disabled
                    : theme.palette.text.primary;

            return (
              <Box
                key={i}
                onClick={() => !disabled && handleDayClick(d)}
                sx={{
                  textAlign: "center",
                  cursor: disabled ? "not-allowed" : "pointer",
                  lineHeight: "32px",
                  borderRadius: "8px",
                  position: "relative",
                  zIndex: 1,
                  color: textColor,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backgroundColor,
                    borderRadius: isStart || isEnd ? "8px" : 0,
                    zIndex: -1,
                  },
                }}
              >
                {d.getDate()}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
};

export default CustomDateRangePicker;
