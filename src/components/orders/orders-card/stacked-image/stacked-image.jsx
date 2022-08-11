import React from 'react';
import styles from './stacked-image.module.css';
import propTypes from "prop-types";

export const StackedImage = ({ image, alt }) => {


	return (
		<div className={styles.border}>
			<div className={styles.item}>
				<img className={styles.img} src={image} alt={alt} />
			</div>
		</div>
	)
}

StackedImage.propTypes = {
	image: propTypes.string.isRequired,
	alt: propTypes.string.isRequired,
};