import { Navigate } from "react-big-calendar"
import TimeGrid from 'react-big-calendar/lib/TimeGrid'

import PropTypes from 'prop-types'
import * as dates from 'date-arithmetic'
import { useMemo } from "react"

const MyRange = ({
  date,
  localizer,
  duration,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) => {

  const currRange = useMemo(
    () => MyRange.range(date, { localizer }, 5),
    [date, localizer]
  )

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}

MyRange.range = (date, { localizer }, duration) => {
  const start = date
  const end = dates.add(start, duration - 1, 'day')

  let current = start
  const range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }

  return range
}

MyRange.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 1, 'day')

    default:
      return date
  }
}

MyRange.title = (date) => {
  return `My awesome week: ${date.toLocaleDateString()}`
}

MyRange.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  duration: PropTypes.number,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

export default MyRange;