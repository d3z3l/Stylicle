import React from "react";


export default class About extends React.Component {
  componentDidMount = () => {
    
  };

  render() {
    return (
      <>
	  	<div class="col-md-8">
			<h1>Contact - Stylicle</h1>
			<div class="card">
				<div class="card-body">
					<ul class="contact">
						<li><strong>Support</strong></li>
						<li><a href="mailto:support@stylicle.com">support@stylicle.com</a></li>
						<li>+92 (323) 900-0511</li>
					</ul>
				</div>
			</div>
		</div>
      </>
    );
  }
}
