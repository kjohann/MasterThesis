package launcher.gui;

import java.awt.EventQueue;

import javax.swing.JFrame;
import java.awt.Dimension;
import java.awt.Rectangle;
import com.jgoodies.forms.layout.FormLayout;
import com.jgoodies.forms.layout.ColumnSpec;
import com.jgoodies.forms.layout.RowSpec;
import com.jgoodies.forms.factories.FormFactory;
import javax.swing.JButton;
import javax.swing.JLabel;
import com.jgoodies.forms.factories.DefaultComponentFactory;
import java.awt.Component;
import java.awt.Font;
import javax.swing.JTextField;
import javax.swing.JPanel;
import java.awt.GridLayout;
import javax.swing.JComboBox;
import javax.swing.DefaultComboBoxModel;

public class LauncherWindow {

	private JFrame frmClientLauncher;
	private JTextField txtNumberOfBrowsers;
	private JTextField txtChartUrl;
	private JTextField txtSpacing;
	private JTextField txtNumberOfClientsTotal;
	private JTextField txtConnInterval;
	private JTextField txtMessageInterval;
	private JTextField txtTransport;
	private JTextField txtNumClientsInBrowser;
	private JTextField txtNumMessagesClient;

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
		frmClientLauncher.setBounds(new Rectangle(200, 50, 600, 500));
		frmClientLauncher.setSize(new Dimension(600, 500));
		frmClientLauncher.setTitle("Client launcher");
		frmClientLauncher.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frmClientLauncher.getContentPane().setLayout(new FormLayout(new ColumnSpec[] {
				FormFactory.RELATED_GAP_COLSPEC,
				ColumnSpec.decode("default:grow"),
				FormFactory.RELATED_GAP_COLSPEC,
				ColumnSpec.decode("default:grow"),},
			new RowSpec[] {
				FormFactory.RELATED_GAP_ROWSPEC,
				FormFactory.DEFAULT_ROWSPEC,
				FormFactory.RELATED_GAP_ROWSPEC,
				FormFactory.DEFAULT_ROWSPEC,
				FormFactory.RELATED_GAP_ROWSPEC,
				FormFactory.DEFAULT_ROWSPEC,
				FormFactory.RELATED_GAP_ROWSPEC,
				FormFactory.DEFAULT_ROWSPEC,
				FormFactory.RELATED_GAP_ROWSPEC,
				FormFactory.DEFAULT_ROWSPEC,
				FormFactory.RELATED_GAP_ROWSPEC,
				FormFactory.DEFAULT_ROWSPEC,
				FormFactory.RELATED_GAP_ROWSPEC,
				FormFactory.DEFAULT_ROWSPEC,
				FormFactory.RELATED_GAP_ROWSPEC,
				RowSpec.decode("default:grow"),
				FormFactory.RELATED_GAP_ROWSPEC,
				FormFactory.DEFAULT_ROWSPEC,}));
		
		JLabel lblAvailableTransportsBy = DefaultComponentFactory.getInstance().createLabel("Available transports by framework:");
		lblAvailableTransportsBy.setFont(new Font("Arial", Font.BOLD, 18));
		frmClientLauncher.getContentPane().add(lblAvailableTransportsBy, "2, 2");
		
		JLabel lblSignalrWebsocketsServersentevents = DefaultComponentFactory.getInstance().createLabel("SignalR: webSockets, serverSentEvents, foreverFrame, longPolling");
		lblSignalrWebsocketsServersentevents.setFont(new Font("Arial", Font.PLAIN, 14));
		frmClientLauncher.getContentPane().add(lblSignalrWebsocketsServersentevents, "2, 4");
		
		JLabel lblSocketioserverOnly = DefaultComponentFactory.getInstance().createLabel("Socket.IO: (Server only): websocket, htmlfile, xhr-polling, jsonp-polling");
		lblSocketioserverOnly.setFont(new Font("Arial", Font.PLAIN, 14));
		frmClientLauncher.getContentPane().add(lblSocketioserverOnly, "2, 6");
		
		JLabel lblPlayWebsocketComet = DefaultComponentFactory.getInstance().createLabel("Play: websocket, comet");
		lblPlayWebsocketComet.setFont(new Font("Arial", Font.PLAIN, 14));
		frmClientLauncher.getContentPane().add(lblPlayWebsocketComet, "2, 8");
		
		JLabel lblLightstreamerWsstreamingHttpstreaming = DefaultComponentFactory.getInstance().createLabel("Lightstreamer: WS-STREAMING, HTTP-STREAMING, WS-POLLING, HTTP-POLLING");
		lblLightstreamerWsstreamingHttpstreaming.setFont(new Font("Arial", Font.PLAIN, 14));
		frmClientLauncher.getContentPane().add(lblLightstreamerWsstreamingHttpstreaming, "2, 10");
		
		JLabel lblSockjsWebsocketXhrstreaming = DefaultComponentFactory.getInstance().createLabel("SockJS: websocket, xhr-streaming, xhr-polling");
		lblSockjsWebsocketXhrstreaming.setFont(new Font("Arial", Font.PLAIN, 14));
		frmClientLauncher.getContentPane().add(lblSockjsWebsocketXhrstreaming, "2, 12");
		
		JLabel lblSettings = DefaultComponentFactory.getInstance().createLabel("Settings:");
		lblSettings.setFont(new Font("Arial", Font.BOLD, 18));
		frmClientLauncher.getContentPane().add(lblSettings, "2, 14");
		
		JPanel settingsPanel = new JPanel();
		frmClientLauncher.getContentPane().add(settingsPanel, "2, 16, fill, fill");
		settingsPanel.setLayout(null);
		
		JLabel lblNumberOfBrowsers = new JLabel("Number of browsers:");
		lblNumberOfBrowsers.setFont(new Font("Arial", Font.PLAIN, 14));
		lblNumberOfBrowsers.setBounds(0, 11, 136, 14);
		settingsPanel.add(lblNumberOfBrowsers);
		
		txtNumberOfBrowsers = new JTextField();
		txtNumberOfBrowsers.setFont(new Font("Arial", Font.PLAIN, 14));
		txtNumberOfBrowsers.setBounds(146, 9, 26, 20);
		settingsPanel.add(txtNumberOfBrowsers);
		txtNumberOfBrowsers.setColumns(2);
		
		JLabel lblNewLabel = new JLabel("Url for chart API:");
		lblNewLabel.setFont(new Font("Arial", Font.PLAIN, 14));
		lblNewLabel.setBounds(0, 36, 119, 20);
		settingsPanel.add(lblNewLabel);
		
		txtChartUrl = new JTextField();
		txtChartUrl.setText("http://localhost/ChartsAPI/api/charts");
		txtChartUrl.setFont(new Font("Arial", Font.PLAIN, 14));
		txtChartUrl.setBounds(116, 36, 152, 20);
		settingsPanel.add(txtChartUrl);
		txtChartUrl.setColumns(100);
		
		JLabel lblSpacingOfXaxis = new JLabel("Spacing of x-axis: ");
		lblSpacingOfXaxis.setFont(new Font("Arial", Font.PLAIN, 14));
		lblSpacingOfXaxis.setBounds(0, 69, 119, 20);
		settingsPanel.add(lblSpacingOfXaxis);
		
		JLabel lblTotalNumberOf = new JLabel("Total number of clients:");
		lblTotalNumberOf.setFont(new Font("Arial", Font.PLAIN, 14));
		lblTotalNumberOf.setBounds(0, 103, 152, 20);
		settingsPanel.add(lblTotalNumberOf);
		
		JLabel lblConnectionInterval = new JLabel("Connection interval (in ms):");
		lblConnectionInterval.setFont(new Font("Arial", Font.PLAIN, 14));
		lblConnectionInterval.setBounds(0, 138, 193, 20);
		settingsPanel.add(lblConnectionInterval);
		
		JLabel lblConnectionInterval_1 = new JLabel("Message interval (in ms):");
		lblConnectionInterval_1.setFont(new Font("Arial", Font.PLAIN, 14));
		lblConnectionInterval_1.setBounds(0, 173, 165, 20);
		settingsPanel.add(lblConnectionInterval_1);
		
		txtSpacing = new JTextField();
		txtSpacing.setFont(new Font("Arial", Font.PLAIN, 14));
		txtSpacing.setBounds(126, 67, 26, 20);
		settingsPanel.add(txtSpacing);
		txtSpacing.setColumns(2);
		
		txtNumberOfClientsTotal = new JTextField();
		txtNumberOfClientsTotal.setFont(new Font("Arial", Font.PLAIN, 14));
		txtNumberOfClientsTotal.setBounds(157, 104, 53, 20);
		settingsPanel.add(txtNumberOfClientsTotal);
		txtNumberOfClientsTotal.setColumns(4);
		
		txtConnInterval = new JTextField();
		txtConnInterval.setFont(new Font("Arial", Font.PLAIN, 14));
		txtConnInterval.setBounds(190, 139, 53, 20);
		settingsPanel.add(txtConnInterval);
		txtConnInterval.setColumns(3);
		
		txtMessageInterval = new JTextField();
		txtMessageInterval.setFont(new Font("Arial", Font.PLAIN, 14));
		txtMessageInterval.setBounds(171, 174, 53, 20);
		settingsPanel.add(txtMessageInterval);
		txtMessageInterval.setColumns(4);
		
		JLabel lblTransport = new JLabel("Transport:");
		lblTransport.setFont(new Font("Arial", Font.PLAIN, 14));
		lblTransport.setBounds(278, 36, 119, 20);
		settingsPanel.add(lblTransport);
		
		JLabel lblNumberOfClients = new JLabel("Number of clients in browser:");
		lblNumberOfClients.setFont(new Font("Arial", Font.PLAIN, 14));
		lblNumberOfClients.setBounds(278, 69, 193, 20);
		settingsPanel.add(lblNumberOfClients);
		
		JLabel lblNumberOfMessages = new JLabel("Number of messages pr. client:");
		lblNumberOfMessages.setFont(new Font("Arial", Font.PLAIN, 14));
		lblNumberOfMessages.setBounds(278, 103, 210, 20);
		settingsPanel.add(lblNumberOfMessages);
		
		JLabel lblTypeOfTest = new JLabel("Type of test:");
		lblTypeOfTest.setFont(new Font("Arial", Font.PLAIN, 14));
		lblTypeOfTest.setBounds(278, 138, 90, 20);
		settingsPanel.add(lblTypeOfTest);
		
		txtTransport = new JTextField();
		txtTransport.setFont(new Font("Arial", Font.PLAIN, 14));
		txtTransport.setBounds(360, 37, 152, 20);
		settingsPanel.add(txtTransport);
		txtTransport.setColumns(20);
		
		txtNumClientsInBrowser = new JTextField();
		txtNumClientsInBrowser.setFont(new Font("Arial", Font.PLAIN, 14));
		txtNumClientsInBrowser.setBounds(465, 70, 39, 20);
		settingsPanel.add(txtNumClientsInBrowser);
		txtNumClientsInBrowser.setColumns(2);
		
		txtNumMessagesClient = new JTextField();
		txtNumMessagesClient.setFont(new Font("Arial", Font.PLAIN, 14));
		txtNumMessagesClient.setColumns(4);
		txtNumMessagesClient.setBounds(485, 104, 58, 20);
		settingsPanel.add(txtNumMessagesClient);
		
		JButton btnStart = new JButton("Start");
		btnStart.setFont(new Font("Arial", Font.PLAIN, 14));
		btnStart.setBounds(278, 183, 119, 23);
		settingsPanel.add(btnStart);
		
		JButton btnResetFields = new JButton("Reset fields");
		btnResetFields.setFont(new Font("Arial", Font.PLAIN, 14));
		btnResetFields.setBounds(407, 183, 119, 23);
		settingsPanel.add(btnResetFields);
		
		JComboBox ddmTestType = new JComboBox();
		ddmTestType.setModel(new DefaultComboBoxModel(new String[] {"Echo", "Broadcast"}));
		ddmTestType.setFont(new Font("Arial", Font.PLAIN, 14));
		ddmTestType.setBounds(378, 139, 134, 20);
		settingsPanel.add(ddmTestType);
		
		JLabel lblFramework = new JLabel("Framework:");
		lblFramework.setFont(new Font("Arial", Font.PLAIN, 14));
		lblFramework.setBounds(283, 12, 85, 14);
		settingsPanel.add(lblFramework);
		
		JComboBox ddmFramework = new JComboBox();
		ddmFramework.setModel(new DefaultComboBoxModel(new String[] {"SignalR", "Socket.IO", "Play", "Lightstreamer", "SockJS"}));
		ddmFramework.setFont(new Font("Arial", Font.PLAIN, 14));
		ddmFramework.setBounds(370, 9, 134, 20);
		settingsPanel.add(ddmFramework);
		frmClientLauncher.setVisible(true);
	}
}
