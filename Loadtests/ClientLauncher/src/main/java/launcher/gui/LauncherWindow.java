package launcher.gui;

import java.awt.EventQueue;

import javax.swing.JFrame;
import java.awt.Dimension;
import java.awt.Rectangle;

public class LauncherWindow {

	private JFrame frmClientLauncher;

	/**
	 * Create the application.
	 */
	public LauncherWindow() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frmClientLauncher = new JFrame();
		frmClientLauncher.setBounds(new Rectangle(200, 50, 600, 600));
		frmClientLauncher.setSize(new Dimension(600, 600));
		frmClientLauncher.setTitle("Client launcher");
		frmClientLauncher.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frmClientLauncher.setVisible(true);
	}

}
