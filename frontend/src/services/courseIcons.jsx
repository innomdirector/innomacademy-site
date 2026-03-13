import React from 'react'
import { FaGlobe, FaChartBar, FaBrain, FaCube } from 'react-icons/fa'

const iconByKey = {
  FaGlobe: FaGlobe,
  FaChartBar: FaChartBar,
  FaBrain: FaBrain,
  FaCube: FaCube,
}

export const renderCourseIcon = (iconKey, className = 'text-white') => {
  const Icon = iconByKey[iconKey] || FaGlobe
  return <Icon className={className} />
}
