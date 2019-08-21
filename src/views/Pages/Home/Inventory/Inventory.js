import React, { Component } from 'react';
import "../../../../css/style.css"

function InventoryItem() {
    const border = {
      padding: "1%"
      // float: "left"
    };
    return (
      <div style={border} class="ht-tm-codeblock">
        <div class="ht-tm-element card">
          <h5 class="card-title">Inventory 1</h5>
          <div id="container" class="card-body">
            <img
              id="image"
              class="card-img-top"
              src="/bootstrap-themes/demo/images/card.png"
              alt="Card image cap"
            />
            <div id="middle">
              <p id="text" class="card-text">
                Hover Text
              </p>
            </div>
          </div>
          <a href="#!" class="ht-tm-element btn btn-outline-success">
            Use
          </a>
        </div>
      </div>
    );
  }
  
export default function Inventory() {
    return (
    <React.Fragment >
      <div class="ht-tm-codeblock ht-tm-btn">
        <div class="ht-tm-element card text-center">
          <h3 class="card-header">Inventory</h3>
          <div class="card-body">
            <InventoryItem />
            <InventoryItem />
          </div>
          <div class="card-footer text-muted">2 Items</div>
        </div>
      </div>
    </React.Fragment>
    );
  }