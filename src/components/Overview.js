import React from 'react'

const Overview = () => {
    return (
        <div>
            <h2>React and D3</h2>
            <h4>The problem</h4>
            <p>
                We want to integrate React and D3, but both libraries want control over the DOM.
            D3 mutates the DOM. React reconciles the DOM.
            React is more performant than D3 at updating the DOM due to React's virtual DOM and reconcilation algorithm, which only changes parts of the DOM that need changing.
            Further, React is unaware of changes made to the DOM outside of React. It determines updates based on its own internal representation, and if the same DOM nodes are manipulated by another library, React gets confused and has no way to recover.
            </p>
            <p>
                So, how do we integrate the libaries and avoid conflict over the DOM?. What are the pros / cons of each?
            </p>
            <p>
                There are 3 main approaches:
            <ul class="approaches">
                    <li>
                        <span><strong>Blackbox</strong> - The easiest way to avoid conflicts is to prevent the React component from updating. You can do this by rendering elements that React has no reason to update, like an empty div.
                        This is our container element. D3 then 'hijacks' this container to do the rendering. React essentially skips over that part of the DOM because it is unaware that anything has changed.</span>
                        <div className="bold">Pros</div>
                        <ul>
                            <li>Can use with existing code, examples</li>
                            <li>Developer familiarity</li>
                            <li>Use D3 enter/update/exit cycle, so can do animations</li>

                        </ul>
                        <div className="bold">Cons</div>
                        <ul>
                            <li>Loose the performance benefits of React for DOM controlled by D3</li>
                            <li>Have to manually trigger D3 to update (componentDidMount / componentDidUpdate). Can't use stateless components</li>
                            <li>Islands of DOM controlled by another library</li>
                        </ul>
                    </li>

                    <li>
                        <span><strong>Integrated</strong> - using D3’s helpers to prepare the data, the axes, etc. and then feed all of that to React to be rendered.
                        We don't use D3’s data binding, but handle it yourself with React by specifying a key for all your SVG elements.
                        This is something you sometimes have to do in D3 too, when the binding is not trivial enough for D3 to figure it out alone.
                        The big change here is that you will render your SVG elements as JSX, instead of using the familiar d3.(...).append()</span>
                        <div className="bold">Pros</div>
                        <ul>
                            <li>Performance benefits of React</li>
                            <li>Stay within D3 component lifecycle - no need to manually trigger D3 to update</li>
                            <li>Composible - Line, Axis, Legend, etc</li>
                        </ul>
                        <div className="bold">Cons</div>
                        <ul>
                            <li>Cannot use existing code / examples</li>
                            <li>Cannot use D3 enter/update/exit cycle, so we lose animations</li>
                        </ul>
                    </li>

                    <li>
                        <span><strong>Seamless (react-faux-dom)</strong> - let D3 render to a 'fake' DOM. Call .toReact() on fake DOM which will return a regular React element to return from the render() function</span>
                        <div className="bold">Pros</div>
                        <ul>
                            <li>Performance benefits of React</li>
                            <li>Stay within D3 component lifecycle - no need to manually trigger D3 to update</li>
                            <li>Can use with existing code, examples</li>
                            <li>Developer familiarity</li>
                            <li>Use D3 enter/update/exit cycle, so can do animations</li>
                            <li>Isomorphic charts</li>
                        </ul>
                        <div className="bold">Cons</div>
                        <ul>
                            <li>Dependency on 3rd party libary - risk of abandonment</li>
                        </ul>
                    </li>
                </ul>
            </p>
            <p>
                Recommendation is react-faux-dom. We get the best of both worlds - React performance with D3 programming model.
            </p>
        </div>
    )
}

export default Overview