import React from 'react'
import BlackboxLineChart from './blackbox/BlackboxLineChart'
import BlackboxBarChart from './blackbox/BlackboxBarChart'
import IntegratedBarChart from './integrated/IntegratedBarChart'
import IntegratedLineChart from './integrated/IntegratedLineChart'
import SeamlessBarChart from './seamless/SeamlessBarChart'
import Overview from './Overview'
import { Route, NavLink } from 'react-router-dom'

const chartSizes = {
  bar: { width: 500, height: 500 },
  line: { width: 1200, height: 600 }
}

const Blackbox = ({ data }) => {
  return (
    <div>
      <BlackboxBarChart data={data.current} width={chartSizes.bar.width} height={chartSizes.bar.height} />
      <BlackboxLineChart data={data.timeSeries} width={chartSizes.line.width} height={chartSizes.line.height} />
    </div>
  )
}

const Integrated = ({ data }) => {
  return (
    <div>
      <IntegratedBarChart data={data.current} width={chartSizes.bar.width} height={chartSizes.bar.height} />
      <IntegratedLineChart data={data.timeSeries} width={chartSizes.line.width} height={chartSizes.line.height} />
    </div>
  )
}

const Seamless = ({ data }) => {
  return (
    <div>
      <SeamlessBarChart data={data.current} width={chartSizes.bar.width} height={chartSizes.bar.height} />
    </div>
  )
}

const architectureTypes = ['blackbox', 'integrated', 'seamless']


const Layout = ({ data }) => {
  return (
    <div>
      <NavLink
              to="/overview" 
              key="overview" 
              className="btn"
              activeStyle={{ color: 'black' }}>
              OVERVIEW
      </NavLink>

      {architectureTypes.map(t =>
        <NavLink to={`/${t}`}
          key={t}
          className="btn"
          activeStyle={{ color: 'black' }}>
          {t.toUpperCase()}
        </NavLink>
      )}
      <Route path="/overview" component={Overview} />
      <Route path="/blackbox" render={() => <Blackbox data={data} />} />
      <Route path="/integrated" render={() => <Integrated data={data} />} />
      <Route path="/seamless" render={() => <Seamless data={data} />} />
    </div>
  )
}

export default Layout