import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { PopUp } from '../modals/PopUp';
import { PopupOption } from '../item-lists/PopupOption';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
	options: {
		label: string;
		icon: string;
		onPress: () => void;
		disabled?: boolean;
	}[];
}

export const OptionsButton = ({ options }: Props) => {
	const { theme } = useContext(ThemeContext);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const onSelectOption = (onPress: () => void) => {
		setIsPopupOpen(false);
		onPress();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => setIsPopupOpen(true)}
				style={styles.optionsButton}
			>
				<Ionicons name="ellipsis-vertical" size={20} />
			</TouchableOpacity>

			<PopUp
				isPopupOpen={isPopupOpen}
				setIsPopupOpen={setIsPopupOpen}
				top={50}
				right={30}
			>
				<>
					{options.map((opt) => (
						(!opt.disabled) && (
							<PopupOption
								onPress={() => onSelectOption(opt.onPress)}
								key={opt.label}
								disabled={opt.disabled}
							>
								<Text 
									style={[styles.labelOption, { color: (opt.disabled) ? theme.disable : theme.colors.text }]}
								>
									{opt.label}
								</Text>
								<Ionicons
									name={opt.icon as any}
									size={15}
									color={(opt.disabled) ? theme.disable : theme.colors.text}
								/>
							</PopupOption>
						)
					))}
				</>
			</PopUp>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-end',
		zIndex: 1,
	},
	optionsButton: {},
	labelOption: {
		fontSize: 16,
		marginRight: 10,
	},
});
