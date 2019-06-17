import React from 'react';
import {WithTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withTranslation} from '../i18n';
import {IReduxState, RootThunkDispatch} from '../reducers';
import {styles} from '../styles';

interface IProps {
	navigation: NavigationScreenProp<NavigationRoute>;
}

type Props = IProps & IPropsState & ActionList & WithTranslation;

class HomeView extends React.Component<Props> {
	public static navigationOptions = {
		title: 'Home View',
	};
	public render() {
		const {navigate} = this.props.navigation;
		const {t} = this.props;
		return (
			<View style={styles.container}>
				<Text>
					{t('hello')} {t('world')}
				</Text>
				<TouchableOpacity style={styles.button} onPress={() => navigate('Demo')}>
					<Text style={styles.buttonText}>Nodes</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state: IReduxState) => {
	return {};
};

type IPropsState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: RootThunkDispatch) => bindActionCreators({}, dispatch);
type ActionList = ReturnType<typeof mapDispatchToProps>;

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withTranslation()(HomeView));
