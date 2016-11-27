var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState: function(){
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },

  // this method gets fired right after props or states get updated
  componentDidUpdate: function(prevProps, prevState){
    var updatedState = this.state.countdownStatus;
    if(updatedState !== prevState.countdownStatus){
      switch(updatedState){
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },

  /*
  // will run just before props or states get updated
  componentWillUpdate: function(nextProps, nextState){

  },

  // method will run just before component gets shown to screen (mounted)
  componentWillMount: function(){
    console.log('component will mount');
  },

  // method will run just after component gets rendered
  componentDidMount: function(){
    console.log('component did mount');
  },
  */

  // when component is removed visually (unmounted)
  componentWillUnmount: function(){
    clearInterval(this.timer);
    this.timer = undefined;
  },

  startTimer: function(){
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if(newCount === 0){
        this.setState({
          countdownStatus: 'stopped'
        });
      }
    }, 1000);
  },

  handleSetCountdown: function(seconds){
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  },

  handleStatusChange: function(newStatus){
    this.setState({
      countdownStatus: newStatus
    });
  },

  render: function(){
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if(countdownStatus !== 'stopped'){
        // render Controls
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
      }else{
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    };
    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    );
  }
});

module.exports = Countdown;
