import COLORS from 'theme/colors';

const inter = '/fonts/Inter-Regular.ttf';
const inter500 = '/fonts/Inter-SemiBold.ttf';

const generalSans = '/fonts/GeneralSans-Regular.ttf';
const generalSans500 = '/fonts/GeneralSans-Medium.ttf';
const generalSans600 = '/fonts/GeneralSans-Semibold.ttf';
const generalSans700 = '/fonts/GeneralSans-Bold.ttf';

const clash = '/fonts/ClashGrotesk-Regular.ttf';
const clash600 = '/fonts/ClashGrotesk-Semibold.ttf';
const clash500 = '/fonts/ClashGrotesk-Medium.ttf';
const clash700 = '/fonts/ClashGrotesk-Bold.ttf';

const components: any = {
	MuiCssBaseline: {
		styleOverrides: `
		@font-face {
			font-family: "inter";
  	src: local("inter"), url(${inter}) format("truetype");
		}
		
		@font-face {
			font-family: "inter-500";
  	src: local("inter-500"), url(${inter500}) format("truetype");
		}
		
		@font-face {
			font-family: "general-sans";
  	src: local("general-sans"), url(${generalSans}) format("truetype");
		}
		
		@font-face {
			font-family: "general-sans-500";
  	src: local("general-sans-500"), url(${generalSans500}) format("truetype");
		}
		
		@font-face {
			font-family: "general-sans-600";
  	src: local("general-sans-600"), url(${generalSans600}) format("truetype");
		}
		
		@font-face {
			font-family: "general-sans-700";
  	src: local("general-sans-700"), url(${generalSans700}) format("truetype");
		}
		
		@font-face {
			font-family: "clash";
			src: local("clash"), url(${clash}) format("truetype");
		}
		
		
		@font-face {
			font-family: "clash-500";
			src: local("clash-500"), url(${clash500}) format("truetype");
		}
		
		@font-face {
			font-family: "clash-600";
			src: local("clash-600"), url(${clash600}) format("truetype");
		}
		
		@font-face {
			font-family: "clash-700";
  	src: local("clash-700"), url(${clash700}) format("truetype");
		}
		`,
	},
	MuiTypography: {
		styleOverrides: {
			body1: {
				color: '#6B6C82',
				fontFamily: 'inter',
				fontSize: '13px',
				lineHeight: '20px',
			},
		},
		defaultProps: {
			variantMapping: {
				body1: 'div',
				heading1: 'div',
				heading2: 'div',
			},
		},
	},
	MuiButton: {
		styleOverrides: {
			contained: {
				minHeight: '36px',
				borderRadius: '8px',
				boxShadow: 'unset',
				fontFamily: 'inter',
				fontSize: '13px',
				textTransform: 'none',
				color: '#FFF',
				'&.Mui-disabled': {
					backgroundColor: COLORS.primary,
					color: '#FFF',
					opacity: 0.4,
				},
			},
			outlined: {
				minHeight: '36px',
				borderRadius: '8px',
				boxShadow: 'unset',
				fontFamily: 'inter',
				fontSize: '13px',
				textTransform: 'none',
				borderWidth: '1.5px',
				'&:hover': {
					backgroundColor: 'transparent',
					borderWidth: '1.5px',
					borderRadius: '8px',
				},
			},
			text: {
				fontFamily: 'inter',
				fontSize: '13px',
				textTransform: 'none',
			},
		},
	},
	MuiCheckbox: {
		styleOverrides: {
			root: {
				'&.Mui-disabled': {
					opacity: 0.5,
				},
			},
		},
	},
	MuiPaper: {
		styleOverrides: {
			root: {
				boxShadow: 'unset',
				backgroundColor: '#FFF',
			},
		},
	},
};

export default components;
