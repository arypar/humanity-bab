// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title DonationContract
 * @dev Contract for handling nonprofit donations on Sepolia testnet
 */
contract DonationContract {
    // Structure to represent a nonprofit organization
    struct Nonprofit {
        address payable walletAddress;
        string organizationName;
        string ein; // Employer Identification Number
        bool isVerified;
        uint256 totalDonationsReceived;
    }
    
    // Structure to represent a donation
    struct Donation {
        address donor;
        address recipient;
        uint256 amount;
        uint256 timestamp;
    }
    
    // Mapping of nonprofit wallet addresses to their information
    mapping(address => Nonprofit) public nonprofits;
    
    // Array of all nonprofit addresses for enumeration
    address[] public nonprofitAddresses;
    
    // Mapping of donor addresses to their donation history
    mapping(address => Donation[]) public donorHistory;
    
    // Mapping of nonprofit addresses to their received donations
    mapping(address => Donation[]) public nonprofitDonations;
    
    // All donations made through the contract
    Donation[] public allDonations;
    
    // Contract owner
    address public owner;
    
    // Events
    event NonprofitRegistered(address indexed nonprofitAddress, string organizationName, string ein);
    event NonprofitVerified(address indexed nonprofitAddress);
    event DonationReceived(address indexed donor, address indexed recipient, uint256 amount, uint256 timestamp);
    event FundsWithdrawn(address indexed nonprofit, uint256 amount);
    
    // Constructor
    constructor() {
        owner = msg.sender;
    }
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }
    
    modifier onlyVerifiedNonprofit() {
        require(nonprofits[msg.sender].isVerified, "Only verified nonprofits can call this function");
        _;
    }
    
    // Functions
    
    /**
     * @dev Register a new nonprofit organization
     * @param _organizationName Name of the nonprofit
     * @param _ein Employer Identification Number
     */
    function registerNonprofit(string memory _organizationName, string memory _ein) public {
        require(nonprofits[msg.sender].walletAddress == address(0), "Nonprofit already registered");
        
        nonprofits[msg.sender] = Nonprofit({
            walletAddress: payable(msg.sender),
            organizationName: _organizationName,
            ein: _ein,
            isVerified: false,
            totalDonationsReceived: 0
        });
        
        nonprofitAddresses.push(msg.sender);
        
        emit NonprofitRegistered(msg.sender, _organizationName, _ein);
    }
    
    /**
     * @dev Verify a nonprofit (only contract owner can do this)
     * @param _nonprofitAddress Address of the nonprofit to verify
     */
    function verifyNonprofit(address _nonprofitAddress) public onlyOwner {
        require(nonprofits[_nonprofitAddress].walletAddress != address(0), "Nonprofit not registered");
        nonprofits[_nonprofitAddress].isVerified = true;
        emit NonprofitVerified(_nonprofitAddress);
    }
    
    /**
     * @dev Make a donation to a nonprofit
     * @param _nonprofitAddress Address of the nonprofit to donate to
     */
    function donate(address payable _nonprofitAddress) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        require(nonprofits[_nonprofitAddress].isVerified, "Cannot donate to unverified nonprofit");
        
        // Record the donation
        Donation memory newDonation = Donation({
            donor: msg.sender,
            recipient: _nonprofitAddress,
            amount: msg.value,
            timestamp: block.timestamp
        });
        
        // Update donation records
        donorHistory[msg.sender].push(newDonation);
        nonprofitDonations[_nonprofitAddress].push(newDonation);
        allDonations.push(newDonation);
        
        // Update total donations for the nonprofit
        nonprofits[_nonprofitAddress].totalDonationsReceived += msg.value;
        
        emit DonationReceived(msg.sender, _nonprofitAddress, msg.value, block.timestamp);
    }
    
    /**
     * @dev Allow a nonprofit to withdraw their donations
     */
    function withdrawDonations() public onlyVerifiedNonprofit {
        uint256 amount = nonprofits[msg.sender].totalDonationsReceived;
        require(amount > 0, "No donations to withdraw");
        
        // Reset the nonprofit's donation total
        nonprofits[msg.sender].totalDonationsReceived = 0;
        
        // Send the funds to the nonprofit
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FundsWithdrawn(msg.sender, amount);
    }
    
    /**
     * @dev Get all nonprofits
     * @return Array of nonprofit addresses
     */
    function getAllNonprofits() public view returns (address[] memory) {
        return nonprofitAddresses;
    }
    
    /**
     * @dev Get nonprofit information
     * @param _nonprofitAddress Address of the nonprofit
     * @return Nonprofit information
     */
    function getNonprofitInfo(address _nonprofitAddress) public view returns (Nonprofit memory) {
        return nonprofits[_nonprofitAddress];
    }
    
    /**
     * @dev Get donation history for a donor
     * @param _donorAddress Address of the donor
     * @return Array of donations made by the donor
     */
    function getDonorHistory(address _donorAddress) public view returns (Donation[] memory) {
        return donorHistory[_donorAddress];
    }
    
    /**
     * @dev Get donation history for a nonprofit
     * @param _nonprofitAddress Address of the nonprofit
     * @return Array of donations received by the nonprofit
     */
    function getNonprofitDonations(address _nonprofitAddress) public view returns (Donation[] memory) {
        return nonprofitDonations[_nonprofitAddress];
    }
} 