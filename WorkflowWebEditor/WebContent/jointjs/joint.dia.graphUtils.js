/*! Rappid - the diagramming toolkit

Copyright (c) 2014 client IO

 2014-09-16 


This Source Code Form is subject to the terms of the Rappid Academic License
, v. 1.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_academic_v1.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


// Various utility functions for graph construction.
// =================================================

// This plugin extends the `joint.dia.Graph` object with additional methods.


// Construct a tree from JSON structure of the form:
// `{ name: 'my label', children: [ { name: 'my label 2', children: [...] }, ...] }`
// `parent` is the tree object, i.e. the top level node.
// `opt.children` is the property specifying the children array. `'children'` is the default.
// If `opt.children` is a function, it will called with the current node as an argument and should return an array of its child nodes.
// `opt.makeElement` is a function that is passed the current tree node and returns a JointJS element for it.
// `opt.makeLink` is a function that is passed a parent and child nodes and returns a JointJS link for the edge.
joint.dia.Graph.prototype.constructTree = function(parent, opt, parentElement, collector) {

    collector = collector || [];

    var children = _.isFunction(opt.children) ? opt.children(parent) : parent[opt.children || 'children'];

    if (!parentElement) {

	parentElement = opt.makeElement(parent)
	collector.push(parentElement);
    }

    _.each(children, function(child) {

	var childElement = opt.makeElement(child);
	var link = opt.makeLink(parentElement, childElement);
	collector.push(childElement, link);

	this.constructTree(child, opt, childElement, collector);

    }, this);

    return collector;
};
